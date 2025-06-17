
import React, { useState, useEffect, useCallback } from 'react';
import { 
    PokemonDetail, PokemonSpecies, EvolutionChainResponse, PokemonDetailViewProps,
    PokemonType as PokemonTypeInterface, PokemonAbility, PokemonStat, MAX_STAT_VALUE,
    BreedingInfo, EvolutionChainLink, ProcessedEvolutionDisplayInfo,
    EvolutionStageInfo, EvolutionStep, EvolutionDetailFromApi,
    SupportedLanguage, PokemonTypeColorStyle 
} from '../types';
import { 
    POKEMON_TYPE_COLORS, POKEMON_STAT_COLORS, OFFICIAL_ARTWORK_URL, SPRITE_URL, 
    capitalizeForDisplay, formatId, extractIdFromUrl, formatEvolutionTrigger
} from '../constants';
import { t, getTranslatedType, getTranslatedStat, getTranslatedPokemonName } from '../translations';
import LoadingSpinner from './LoadingSpinner';

// Re-usable StatDisplay component
const StatDisplay: React.FC<{ stat: PokemonStat; lang: SupportedLanguage }> = ({ stat, lang }) => {
  const percentage = Math.min(100, Math.round((stat.base_stat / MAX_STAT_VALUE) * 100));
  const statColorName = stat.stat.name.toLowerCase();
  const statColor = POKEMON_STAT_COLORS[statColorName] || 'bg-slate-500 dark:bg-slate-600';
  const translatedStatName = getTranslatedStat(stat.stat.name, lang);

  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs sm:text-sm mb-0.5">
        <span className="font-medium text-[var(--detail-tab-inactive-text)]">{translatedStatName}</span>
        <span className="font-semibold text-[var(--detail-content-text)] opacity-90">{stat.base_stat}</span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 sm:h-3 overflow-hidden">
        <div
          className={`h-full rounded-full ${statColor} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
          aria-label={`${translatedStatName}: ${stat.base_stat} (${percentage}%)`}
        ></div>
      </div>
    </div>
  );
};


const PokemonDetailView: React.FC<PokemonDetailViewProps> = ({
  pokemonDetail,
  pokemonSpecies,
  evolutionChain,
  isCaptured,
  onToggleCaptured,
  onBack,
  currentLanguage,
  detailsCache 
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'stats' | 'evolution' | 'moves'>('about');
  const [imageSrc, setImageSrc] = useState<string>('');
  const [processedEvolutions, setProcessedEvolutions] = useState<ProcessedEvolutionDisplayInfo | null>(null);

  const pokemonDisplayName = getTranslatedPokemonName(pokemonDetail.name, currentLanguage);

  useEffect(() => {
    setImageSrc(pokemonDetail.sprites.other?.['official-artwork']?.front_default || pokemonDetail.sprites.front_default || OFFICIAL_ARTWORK_URL(pokemonDetail.id));
  }, [pokemonDetail]);

  const handleImageError = () => {
    if (pokemonDetail?.sprites?.front_default && imageSrc !== pokemonDetail.sprites.front_default) {
        setImageSrc(pokemonDetail.sprites.front_default);
    } else if (pokemonDetail?.id && imageSrc !== SPRITE_URL(pokemonDetail.id)) {
        setImageSrc(SPRITE_URL(pokemonDetail.id));
    }
  };
  
  const processEvolutionChainForDisplay = useCallback((
    chainLink: EvolutionChainLink, 
    currentPokemonApiName: string, 
    lang: SupportedLanguage
  ): ProcessedEvolutionDisplayInfo | null => {
    let currentStageInfo: EvolutionStageInfo | null = null;
    let evolvesFromStep: EvolutionStep | undefined = undefined;
    const evolvesToSteps: EvolutionStep[] = [];

    function findPath(currentLink: EvolutionChainLink, path: { link: EvolutionChainLink, details: EvolutionDetailFromApi[] }[] = []): void {
        const speciesId = extractIdFromUrl(currentLink.species.url);
        if (!speciesId) return;
        
        const currentSpeciesDisplayName = getTranslatedPokemonName(currentLink.species.name, lang);
        const stageInfo: EvolutionStageInfo = {
            name: currentSpeciesDisplayName,
            id: speciesId,
            imageUrl: SPRITE_URL(speciesId),
        };

        if (currentLink.species.name === currentPokemonApiName) {
            currentStageInfo = stageInfo;
            if (path.length > 0) {
                const prevPathLink = path[path.length - 1];
                const prevSpeciesId = extractIdFromUrl(prevPathLink.link.species.url);
                if (prevSpeciesId) {
                    evolvesFromStep = {
                        from: { name: getTranslatedPokemonName(prevPathLink.link.species.name, lang), id: prevSpeciesId, imageUrl: SPRITE_URL(prevSpeciesId) },
                        to: stageInfo,
                        method: formatEvolutionTrigger(prevPathLink.details, lang),
                    };
                }
            }
            currentLink.evolves_to.forEach(nextLink => {
                const nextSpeciesId = extractIdFromUrl(nextLink.species.url);
                if (nextSpeciesId) {
                    evolvesToSteps.push({
                        from: stageInfo,
                        to: { name: getTranslatedPokemonName(nextLink.species.name, lang), id: nextSpeciesId, imageUrl: SPRITE_URL(nextSpeciesId) },
                        method: formatEvolutionTrigger(nextLink.evolution_details, lang),
                    });
                }
            });
            return; 
        }
        currentLink.evolves_to.forEach(nextLink => {
            findPath(nextLink, [...path, {link: currentLink, details: nextLink.evolution_details}]);
        });
    }
    
     const firstStageId = extractIdFromUrl(chainLink.species.url);
     if (firstStageId && chainLink.species.name === currentPokemonApiName) { 
        currentStageInfo = {
            name: getTranslatedPokemonName(chainLink.species.name, lang),
            id: firstStageId,
            imageUrl: SPRITE_URL(firstStageId),
        };
        chainLink.evolves_to.forEach(nextLink => {
            const nextSpeciesId = extractIdFromUrl(nextLink.species.url);
            if (nextSpeciesId && currentStageInfo) { 
                 evolvesToSteps.push({
                    from: currentStageInfo,
                    to: { name: getTranslatedPokemonName(nextLink.species.name, lang), id: nextSpeciesId, imageUrl: SPRITE_URL(nextSpeciesId) },
                    method: formatEvolutionTrigger(nextLink.evolution_details, lang),
                });
            }
        });
     } else {
        findPath(chainLink);
     }
    if (!currentStageInfo) return null;
    return { evolvesFrom: evolvesFromStep, currentStage: currentStageInfo, evolvesTo: evolvesToSteps };
  }, []);

  useEffect(() => {
    if (evolutionChain) {
      setProcessedEvolutions(processEvolutionChainForDisplay(evolutionChain.chain, pokemonDetail.name, currentLanguage));
    }
  }, [evolutionChain, pokemonDetail.name, currentLanguage, processEvolutionChainForDisplay]);


  const primaryTypeName = pokemonDetail.types[0]?.type.name.toLowerCase() || 'normal';
  const typeStyle = POKEMON_TYPE_COLORS[primaryTypeName] || POKEMON_TYPE_COLORS['normal'];
  const saturatedBgColor = typeStyle.saturatedColorHex || '#CCCCCC'; // Fallback color

  const getBreedingInfo = (): BreedingInfo => {
    let genderData: BreedingInfo['gender'] = { male_percent: null, female_percent: null, genderless: false };
    if (pokemonSpecies) {
      if (pokemonSpecies.gender_rate === -1) {
        genderData.genderless = true;
      } else {
        genderData.female_percent = (pokemonSpecies.gender_rate / 8) * 100;
        genderData.male_percent = 100 - genderData.female_percent;
      }
    }
    return {
      gender: genderData,
      egg_groups: pokemonSpecies?.egg_groups.map(group => capitalizeForDisplay(group.name, currentLanguage)) || [t('N/A', currentLanguage)],
      egg_cycle: t('N/A', currentLanguage) // This info isn't easily available from PokeAPI for all gens.
    };
  };
  const breedingInfo = getBreedingInfo();
  
  const speciesGenus = pokemonSpecies?.genera.find(g => g.language.name === (currentLanguage === 'pt-BR' ? 'pt' : 'en'))?.genus || 
                       pokemonSpecies?.genera.find(g => g.language.name === 'en')?.genus || t('N/A', currentLanguage);


  const renderEvolutionStage = (stage: EvolutionStageInfo, method?: string, direction?: 'from' | 'to') => (
    <div className={`flex flex-col items-center text-center p-2 rounded-lg bg-slate-100 dark:bg-slate-700/60 shadow-inner ${direction === 'from' || direction === 'to' ? 'w-28 sm:w-32' : ''}`}>
      <img 
        src={stage.imageUrl || SPRITE_URL(stage.id)} 
        alt={stage.name} 
        className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-1" 
        onError={(e) => (e.currentTarget.src = SPRITE_URL(stage.id))}
      />
      <p className="text-xs sm:text-sm font-semibold text-[var(--detail-content-text)]">{stage.name}</p>
      {method && <p className="text-[0.65rem] sm:text-xs text-sky-600 dark:text-sky-400 mt-0.5 px-1 text-center">{method}</p>}
    </div>
  );

  const tabButtonClass = (tabName: typeof activeTab) =>
    `px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors duration-200 
     ${activeTab === tabName 
       ? 'border-[var(--detail-tab-active-border)] text-[var(--detail-tab-active-text)]' 
       : 'border-transparent text-[var(--detail-tab-inactive-text)] hover:text-[var(--detail-tab-inactive-hover-text)]'}`;

  return (
    <div style={{ backgroundColor: saturatedBgColor }} className="min-h-screen w-full overflow-y-auto">
      {/* Top Section on Colored Background */}
      <div className="container mx-auto px-4 sm:px-6 pt-5 pb-4 sm:pb-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-black/10 transition-colors"
            aria-label={t('Back to list', currentLanguage)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => onToggleCaptured(pokemonDetail.id)}
            className={`p-1.5 rounded-full transition-colors ${isCaptured ? 'text-red-400 hover:text-red-300 bg-white/20' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
            aria-label={isCaptured ? t('Unmark as captured', currentLanguage) : t('Mark as captured', currentLanguage)}
            aria-pressed={isCaptured}
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 20 20" fill="currentColor">
                {isCaptured ? (
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                ) : (
                     <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656zM6 6a2 2 0 00-2 2v4a2 2 0 002 2h8a2 2 0 002-2V8a2 2 0 00-2-2H6z" />
                )}
              </svg>
          </button>
        </div>

        <div className="flex justify-between items-end mb-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold [text-shadow:1px_1px_3px_rgba(0,0,0,0.4)]">{pokemonDisplayName}</h1>
          <span className="text-xl sm:text-2xl font-bold [text-shadow:1px_1px_2px_rgba(0,0,0,0.2)]">{formatId(pokemonDetail.id)}</span>
        </div>
        
        <div className="flex space-x-2 mb-2 sm:mb-0">
          {pokemonDetail.types.map((typeInfo: PokemonTypeInterface) => {
            const typeColors: PokemonTypeColorStyle = POKEMON_TYPE_COLORS[typeInfo.type.name.toLowerCase()] || POKEMON_TYPE_COLORS['normal'];
            const badgeStyle = typeColors.backgroundHex ? { backgroundColor: typeColors.backgroundHex } : {};
            const badgeTextClass = typeColors.text || 'text-neutral-800'; // Fallback text color

            return (
              <span
                key={typeInfo.type.name}
                style={badgeStyle}
                className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-full shadow-md ${badgeTextClass}`}
              >
                {getTranslatedType(typeInfo.type.name, currentLanguage)}
              </span>
            );
          })}
        </div>
      </div>

      {/* Pokemon Image */}
      <div className="relative z-10 flex justify-center -mb-12 sm:-mb-16 md:-mb-20"> {/* Negative margin pulls card up */}
        <img
          src={imageSrc}
          alt={pokemonDisplayName}
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain filter drop-shadow-2xl"
          onError={handleImageError}
        />
      </div>

      {/* Information Card */}
      <div className="bg-[var(--page-bg-color)] w-full max-w-4xl mx-auto rounded-t-2xl sm:rounded-t-3xl shadow-xl pt-16 sm:pt-20 md:pt-24 p-4 sm:p-6 pb-8">
        {/* Tabs Navigation */}
        <div className="mb-6 border-b border-slate-200 dark:border-slate-700 flex justify-center">
          <button onClick={() => setActiveTab('about')} className={tabButtonClass('about')} aria-controls="tab-content-about" aria-selected={activeTab === 'about'}>{t('About', currentLanguage)}</button>
          <button onClick={() => setActiveTab('stats')} className={tabButtonClass('stats')} aria-controls="tab-content-stats" aria-selected={activeTab === 'stats'}>{t('Base Stats', currentLanguage)}</button>
          <button onClick={() => setActiveTab('evolution')} className={tabButtonClass('evolution')} aria-controls="tab-content-evolution" aria-selected={activeTab === 'evolution'}>{t('Evolutions', currentLanguage)}</button>
          <button onClick={() => setActiveTab('moves')} className={tabButtonClass('moves')} aria-controls="tab-content-moves" aria-selected={activeTab === 'moves'}>{t('Moves', currentLanguage)}</button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[200px]">
          {activeTab === 'about' && (
            <div id="tab-content-about" role="tabpanel" className="space-y-5 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div><strong className="text-[var(--detail-content-strong-text)]">{t('Species', currentLanguage)}:</strong> <span className="text-[var(--detail-content-text)]">{speciesGenus}</span></div>
                <div><strong className="text-[var(--detail-content-strong-text)]">{t('Height', currentLanguage)}:</strong> <span className="text-[var(--detail-content-text)]">{(pokemonDetail.height / 10).toFixed(1)} m</span></div>
                <div><strong className="text-[var(--detail-content-strong-text)]">{t('Weight', currentLanguage)}:</strong> <span className="text-[var(--detail-content-text)]">{(pokemonDetail.weight / 10).toFixed(1)} kg</span></div>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--detail-section-header-text)] mb-1.5">{t('Abilities', currentLanguage)}:</h4>
                <ul className="list-disc list-inside space-y-1 pl-1 text-sm text-[var(--detail-content-text)]">
                  {pokemonDetail.abilities.map((abilityInfo: PokemonAbility) => (
                    <li key={abilityInfo.ability.name}>
                      {capitalizeForDisplay(abilityInfo.ability.name, currentLanguage)}
                      {abilityInfo.is_hidden && <span className="ml-2 text-xs bg-sky-100 text-sky-700 dark:bg-sky-700 dark:text-sky-200 px-1.5 py-0.5 rounded-full">{t('Hidden', currentLanguage)}</span>}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--detail-section-header-text)] mb-2">{t('Breeding', currentLanguage)}</h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div>
                      <strong className="text-[var(--detail-content-strong-text)]">{t('Gender', currentLanguage)}:</strong>
                      <span className="text-[var(--detail-content-text)] ml-1">
                      {breedingInfo.gender.genderless ? t('Genderless', currentLanguage) : 
                          `${breedingInfo.gender.male_percent !== null ? `♂ ${breedingInfo.gender.male_percent}%` : ''} ${breedingInfo.gender.female_percent !== null ? `♀ ${breedingInfo.gender.female_percent}%` : ''}`.trim() || t('N/A', currentLanguage)}
                      </span>
                  </div>
                  <div><strong className="text-[var(--detail-content-strong-text)]">{t('Egg Groups', currentLanguage)}:</strong> <span className="text-[var(--detail-content-text)]">{breedingInfo.egg_groups.join(', ')}</span></div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'stats' && (
            <div id="tab-content-stats" role="tabpanel" className="animate-fadeIn">
              {pokemonDetail.stats.map((stat: PokemonStat) => (
                <StatDisplay key={stat.stat.name} stat={stat} lang={currentLanguage} />
              ))}
            </div>
          )}
          {activeTab === 'evolution' && (
            <div id="tab-content-evolution" role="tabpanel" className="animate-fadeIn">
              {!evolutionChain && <div className="flex justify-center py-4"><LoadingSpinner size="md"/></div>}
              {evolutionChain && !processedEvolutions && <p className="text-center text-[var(--detail-tab-inactive-text)]">{t("No evolution data available or does not evolve.", currentLanguage)}</p>}
              {processedEvolutions && (
                   <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                      {processedEvolutions.evolvesFrom && (
                          <div className="flex flex-col items-center">
                          {renderEvolutionStage(processedEvolutions.evolvesFrom.from, `${t("Evolved from via:", currentLanguage)} ${processedEvolutions.evolvesFrom.method}`, 'from')}
                          <div className="text-sky-500 dark:text-sky-400 text-2xl my-1 sm:my-1.5">↓</div>
                          </div>
                      )}
                      {renderEvolutionStage(processedEvolutions.currentStage)}
                      {processedEvolutions.evolvesTo.length > 0 && (
                          <div className="flex flex-col items-center w-full">
                          <div className="text-sky-500 dark:text-sky-400 text-2xl my-1 sm:my-1.5">↓</div>
                          <p className="text-xs text-[var(--detail-tab-inactive-text)] mb-1.5 sm:mb-2">{t("Evolves to:", currentLanguage)}</p>
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
                          <p className="text-[var(--detail-tab-inactive-text)] text-sm mt-2">{t("This Pokémon does not evolve.", currentLanguage)}</p>
                      )}
                      {processedEvolutions.evolvesTo.length === 0 && processedEvolutions.evolvesFrom && (
                          <p className="text-[var(--detail-tab-inactive-text)] text-sm mt-2">{t("This is the final evolution.", currentLanguage)}</p>
                      )}
                  </div>
              )}
            </div>
          )}
          {activeTab === 'moves' && (
            <div id="tab-content-moves" role="tabpanel" className="text-center text-[var(--detail-tab-inactive-text)] py-8 animate-fadeIn">
              {t('Moves information coming soon.', currentLanguage)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailView;
