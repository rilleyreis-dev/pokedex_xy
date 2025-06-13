
import React, { useState, useEffect, useCallback } from 'react';
import { 
    PokemonDetail, PokemonStat, PokemonType, MAX_STAT_VALUE, 
    PokemonAbility as PokemonAbilityInterface, 
    BasePokemon,
    PokemonSpecies, EvolutionChainResponse, EvolutionChainLink, ProcessedEvolutionDisplayInfo, EvolutionStageInfo, EvolutionStep,
    EvolutionDetailFromApi // Added import
} from '../types';
import { 
    POKEMON_TYPE_COLORS, POKEMON_STAT_COLORS, OFFICIAL_ARTWORK_URL, SPRITE_URL, 
    capitalize, formatId, INITIAL_POKEMON_LIST, extractIdFromUrl, formatEvolutionTrigger
} from '../constants';
import { getPokemonSpeciesByUrl, getEvolutionChainByUrl } from '../services/pokemonService';
import LoadingSpinner from './LoadingSpinner';

interface PokemonModalProps {
  pokemon: PokemonDetail | null;
  onClose: () => void;
}

const StatDisplay: React.FC<{ stat: PokemonStat }> = ({ stat }) => {
  const percentage = Math.min(100, Math.round((stat.base_stat / MAX_STAT_VALUE) * 100));
  const statColor = POKEMON_STAT_COLORS[stat.stat.name.toLowerCase()] || 'bg-slate-500';

  return (
    <div className="mb-1.5 sm:mb-2">
      <div className="flex justify-between text-xs sm:text-sm mb-0.5">
        <span className="font-medium text-slate-300">{capitalize(stat.stat.name)}</span>
        <span className="font-semibold text-sky-300">{stat.base_stat}</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2.5 sm:h-3 overflow-hidden">
        <div
          data-testid={`stat-bar-${stat.stat.name}`}
          className={`h-full rounded-full ${statColor} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};


const PokemonModal: React.FC<PokemonModalProps> = ({ pokemon, onClose }) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | null>(null);
  const [evolutionChainResponse, setEvolutionChainResponse] = useState<EvolutionChainResponse | null>(null);
  const [processedEvolutions, setProcessedEvolutions] = useState<ProcessedEvolutionDisplayInfo | null>(null);
  const [isEvolutionDataLoading, setIsEvolutionDataLoading] = useState<boolean>(false);
  const [evolutionDataError, setEvolutionDataError] = useState<string | null>(null);


  useEffect(() => {
    if (pokemon) {
      setImageSrc(pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default || OFFICIAL_ARTWORK_URL(pokemon.id));
      
      const fetchEvolutionData = async () => {
        if (!pokemon.species || !pokemon.species.url) {
            setEvolutionDataError("Species data URL missing.");
            return;
        }
        setIsEvolutionDataLoading(true);
        setEvolutionDataError(null);
        setPokemonSpecies(null);
        setEvolutionChainResponse(null);
        setProcessedEvolutions(null);

        try {
          const speciesData = await getPokemonSpeciesByUrl(pokemon.species.url);
          setPokemonSpecies(speciesData);

          if (speciesData.evolution_chain && speciesData.evolution_chain.url) {
            const chainData = await getEvolutionChainByUrl(speciesData.evolution_chain.url);
            setEvolutionChainResponse(chainData);
            setProcessedEvolutions(processEvolutionChainForDisplay(chainData.chain, pokemon.name));
          } else {
            setEvolutionDataError("Evolution chain URL missing.");
          }
        } catch (error) {
          console.error("Failed to load evolution data:", error);
          setEvolutionDataError("Failed to load evolution data.");
        } finally {
          setIsEvolutionDataLoading(false);
        }
      };

      fetchEvolutionData();
    }
  }, [pokemon]);


  const processEvolutionChainForDisplay = useCallback((
    chainLink: EvolutionChainLink, 
    currentPokemonName: string
  ): ProcessedEvolutionDisplayInfo | null => {
    
    let currentStageInfo: EvolutionStageInfo | null = null;
    let evolvesFromStep: EvolutionStep | undefined = undefined;
    const evolvesToSteps: EvolutionStep[] = [];

    function findPath(currentLink: EvolutionChainLink, path: { link: EvolutionChainLink, details: EvolutionDetailFromApi[] }[] = []): void {
        const speciesId = extractIdFromUrl(currentLink.species.url);
        if (!speciesId) return;

        const stageInfo: EvolutionStageInfo = {
            name: capitalize(currentLink.species.name),
            id: speciesId,
            imageUrl: SPRITE_URL(speciesId),
        };

        if (currentLink.species.name === currentPokemonName) {
            currentStageInfo = stageInfo;
            // Check previous stage in path
            if (path.length > 0) {
                const prevPathLink = path[path.length - 1];
                const prevSpeciesId = extractIdFromUrl(prevPathLink.link.species.url);
                if (prevSpeciesId) {
                    evolvesFromStep = {
                        from: { name: capitalize(prevPathLink.link.species.name), id: prevSpeciesId, imageUrl: SPRITE_URL(prevSpeciesId) },
                        to: stageInfo,
                        method: formatEvolutionTrigger(prevPathLink.details),
                    };
                }
            }
            // Check next stages
            currentLink.evolves_to.forEach(nextLink => {
                const nextSpeciesId = extractIdFromUrl(nextLink.species.url);
                if (nextSpeciesId) {
                    evolvesToSteps.push({
                        from: stageInfo,
                        to: { name: capitalize(nextLink.species.name), id: nextSpeciesId, imageUrl: SPRITE_URL(nextSpeciesId) },
                        method: formatEvolutionTrigger(nextLink.evolution_details),
                    });
                }
            });
            return; // Found current Pokemon, stop this branch of recursion for path finding
        }

        // Continue searching
        currentLink.evolves_to.forEach(nextLink => {
            findPath(nextLink, [...path, {link: currentLink, details: nextLink.evolution_details}]);
        });
    }
    
    // To handle the very first stage if currentPokemon is the base form
     const firstStageId = extractIdFromUrl(chainLink.species.url);
     if (firstStageId && chainLink.species.name === currentPokemonName) {
        currentStageInfo = {
            name: capitalize(chainLink.species.name),
            id: firstStageId,
            imageUrl: SPRITE_URL(firstStageId),
        };
        chainLink.evolves_to.forEach(nextLink => {
            const nextSpeciesId = extractIdFromUrl(nextLink.species.url);
            if (nextSpeciesId && currentStageInfo) { // currentStageInfo must be defined
                 evolvesToSteps.push({
                    from: currentStageInfo,
                    to: { name: capitalize(nextLink.species.name), id: nextSpeciesId, imageUrl: SPRITE_URL(nextSpeciesId) },
                    method: formatEvolutionTrigger(nextLink.evolution_details),
                });
            }
        });
     } else {
        findPath(chainLink);
     }


    if (!currentStageInfo) return null; // Should not happen if currentPokemonName is valid

    return {
        evolvesFrom: evolvesFromStep,
        currentStage: currentStageInfo,
        evolvesTo: evolvesToSteps,
    };

  }, []);


  if (!pokemon) return null;
  
  const basePokemonData = INITIAL_POKEMON_LIST.find(p => p.id === pokemon.id);
  const pokemonRoutes = basePokemonData?.routes || [];

  const handleImageError = () => {
    if (pokemon?.sprites?.front_default) {
        setImageSrc(pokemon.sprites.front_default);
    } else if (pokemon?.id) {
        setImageSrc(SPRITE_URL(pokemon.id));
    }
  };

  const getTypeColors = (typeName: string) => {
    return POKEMON_TYPE_COLORS[typeName.toLowerCase()] || { background: 'bg-gray-300', text: 'text-black' };
  };

  const renderEvolutionStage = (stage: EvolutionStageInfo, method?: string, direction?: 'from' | 'to') => (
    <div className={`flex flex-col items-center text-center p-2 rounded-lg bg-slate-700/50 shadow-inner ${direction === 'from' || direction === 'to' ? 'w-28 sm:w-32' : ''}`}>
      <img src={stage.imageUrl} alt={stage.name} className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-1" />
      <p className="text-xs sm:text-sm font-semibold text-slate-200">{stage.name}</p>
      {method && <p className="text-[0.65rem] sm:text-xs text-sky-400 mt-0.5 px-1 text-center">{method}</p>}
    </div>
  );

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center p-2.5 sm:p-4 z-50 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pokemon-modal-title"
    >
      <div 
        className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 relative transform transition-all duration-300 scale-95 hover:scale-100"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 text-slate-400 hover:text-sky-300 transition-colors text-xl sm:text-2xl z-10"
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="md:flex md:space-x-6">
          {/* Left Column: Image and Basic Info */}
          <div className="md:w-1/3 flex flex-col items-center text-center mb-5 sm:mb-6 md:mb-0">
            <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-48 md:h-48 mb-3 sm:mb-4 relative">
                <img
                    src={imageSrc}
                    alt={capitalize(pokemon.name)}
                    className="w-full h-full object-contain filter drop-shadow-xl"
                    onError={handleImageError}
                    loading="lazy"
                />
            </div>
            <p className="text-lg sm:text-xl text-slate-400 font-medium">{formatId(pokemon.id)}</p>
            <h2 id="pokemon-modal-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-300 mb-1.5 sm:mb-2">{capitalize(pokemon.name)}</h2>
            <div className="flex space-x-1.5 sm:space-x-2 justify-center mb-3 sm:mb-4">
              {pokemon.types.map((typeInfo: PokemonType) => {
                 const colors = getTypeColors(typeInfo.type.name);
                 return (
                    <span
                    key={typeInfo.type.name}
                    className={`px-2 py-0.5 text-xs sm:px-3 sm:py-1 sm:text-sm font-semibold rounded-full ${colors.background} ${colors.text} ${colors.border ? `border-2 ${colors.border}` : ''} shadow-md`}
                    >
                    {capitalize(typeInfo.type.name)}
                    </span>
                );
              })}
            </div>
            <div className="grid grid-cols-2 gap-x-3 sm:gap-x-4 text-xs sm:text-sm w-full max-w-xs">
                <div className="text-left">
                    <p className="text-slate-400">Height</p>
                    <p className="font-semibold text-sm sm:text-base md:text-lg text-slate-200">{(pokemon.height / 10).toFixed(1)} m</p>
                </div>
                <div className="text-left">
                    <p className="text-slate-400">Weight</p>
                    <p className="font-semibold text-sm sm:text-base md:text-lg text-slate-200">{(pokemon.weight / 10).toFixed(1)} kg</p>
                </div>
            </div>
          </div>

          {/* Right Column: Abilities, Stats, Routes, and Evolutions */}
          <div className="md:w-2/3">
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-400 mb-2 sm:mb-3 border-b-2 border-slate-700 pb-1">Abilities</h3>
              <ul className="space-y-1 sm:space-y-1.5 text-slate-300 mb-4 sm:mb-6">
                {pokemon.abilities.map((abilityInfo: PokemonAbilityInterface) => (
                  <li key={abilityInfo.ability.name} className="flex items-center text-sm sm:text-base">
                    <span>{capitalize(abilityInfo.ability.name)}</span>
                    {abilityInfo.is_hidden && (
                      <span className="ml-2 text-[0.65rem] sm:text-xs bg-sky-600 text-white px-1.5 sm:px-2 py-0.5 rounded-full">Hidden</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-400 mb-2 sm:mb-3 border-b-2 border-slate-700 pb-1">Base Stats</h3>
              <div className="mb-4 sm:mb-6">
                {pokemon.stats.map((stat: PokemonStat) => (
                  <StatDisplay key={stat.stat.name} stat={stat} />
                ))}
              </div>
            </div>
            
            {pokemonRoutes.length > 0 && (
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-400 mb-2 sm:mb-3 border-b-2 border-slate-700 pb-1">Found on Routes</h3>
                <ul className="flex flex-wrap gap-2 text-slate-300">
                  {pokemonRoutes.map((route: string) => (
                    <li key={route} className="text-sm sm:text-base bg-slate-700 px-2.5 py-1 rounded-md">
                      {capitalize(route)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Evolutions Section */}
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-400 mb-2 sm:mb-3 border-b-2 border-slate-700 pb-1">Evolutions</h3>
              {isEvolutionDataLoading && <div className="flex justify-center py-4"><LoadingSpinner size="md"/></div>}
              {evolutionDataError && <p className="text-red-400 text-sm">{evolutionDataError}</p>}
              {processedEvolutions && !isEvolutionDataLoading && !evolutionDataError && (
                 <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                  {processedEvolutions.evolvesFrom && (
                    <div className="flex flex-col items-center">
                      {renderEvolutionStage(processedEvolutions.evolvesFrom.from, `Evolved from via: ${processedEvolutions.evolvesFrom.method}`, 'from')}
                      <div className="text-sky-400 text-2xl my-1 sm:my-1.5">↓</div>
                    </div>
                  )}

                  {renderEvolutionStage(processedEvolutions.currentStage)}
                  
                  {processedEvolutions.evolvesTo.length > 0 && (
                    <div className="flex flex-col items-center w-full">
                       <div className="text-sky-400 text-2xl my-1 sm:my-1.5">↓</div>
                       <p className="text-xs text-slate-400 mb-1.5 sm:mb-2">Evolves to:</p>
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                            {processedEvolutions.evolvesTo.map((evoTo, index) => (
                                <div key={index} className="flex flex-col items-center">
                                  {renderEvolutionStage(evoTo.to, evoTo.method, 'to')}
                                </div>
                            ))}
                        </div>
                    </div>
                  )}
                  {processedEvolutions.evolvesTo.length === 0 && !processedEvolutions.evolvesFrom && (
                    <p className="text-slate-400 text-sm mt-2">This Pokémon does not evolve.</p>
                  )}
                   {processedEvolutions.evolvesTo.length === 0 && processedEvolutions.evolvesFrom && (
                    <p className="text-slate-400 text-sm mt-2">This is the final evolution.</p>
                  )}
                </div>
              )}
              {!processedEvolutions && !isEvolutionDataLoading && !evolutionDataError && (
                 <p className="text-slate-400 text-sm">No evolution data available or does not evolve.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;