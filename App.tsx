
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { 
    INITIAL_POKEMON_LIST, getUniqueRoutes, STANDARD_POKEMON_TYPES, KALOS_GYM_LEADERS,
    POKEMON_TYPE_COLORS, extractIdFromUrl, SPRITE_URL, formatEvolutionTrigger, capitalizeForDisplay
} from './constants';
import { 
    BasePokemon, PokemonDetail, GymLeaderInfo, SupportedLanguage, Theme, 
    PokemonModalProps, PokemonSpecies, EvolutionChainResponse,
    EvolutionChainLink, ProcessedEvolutionDisplayInfo, EvolutionStageInfo, EvolutionStep, EvolutionDetailFromApi,
    GymLeaderDetailViewProps
} from './types';
import { getPokemonDetailsById, getPokemonSpeciesByUrl, getEvolutionChainByUrl } from './services/pokemonService';
import { t, getTranslatedPokemonName, getTranslatedType, getTranslatedStat } from './translations';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal'; 
import PokemonDetailView from './components/PokemonDetailView'; 
import GymLeaderDetailView from './components/GymLeaderDetailView'; // New Gym Leader Detail View
import SearchBar from './components/SearchBar';
import RouteFilter from './components/RouteFilter';
import TypeFilter from './components/TypeFilter';
import LoadingSpinner from './components/LoadingSpinner';
import GymLeaderCard from './components/GymLeaderCard';
// GymLeaderModal component is now replaced by GymLeaderDetailView
// import GymLeaderModal from './components/GymLeaderModal'; 
import LanguageSwitcher from './components/LanguageSwitcher';
import ThemeSwitcher from './components/ThemeSwitcher';

type View = 'pokedex' | 'gymLeaders';

const CAPTURED_POKEMON_STORAGE_KEY = 'kalosPokedexCapturedIds';
const DEFEATED_GYM_LEADERS_STORAGE_KEY = 'kalosPokedexDefeatedGymLeaders';
const POKEMON_DETAILS_BATCH_SIZE = 25; 
const DELAY_BETWEEN_BATCHES_MS = 200; 

const getDefaultLanguage = (): SupportedLanguage => {
  const storedLang = localStorage.getItem('kalosPokedexLanguage') as SupportedLanguage | null;
  if (storedLang && (storedLang === 'en' || storedLang === 'pt-BR')) {
    return storedLang;
  }
  const browserLang = navigator.language.split('-')[0];
  return browserLang === 'pt' ? 'pt-BR' : 'en';
};

const getDefaultTheme = (): Theme => {
  const storedTheme = localStorage.getItem('kalosPokedexTheme') as Theme | null;
  if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
    return storedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};


const App: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(getDefaultLanguage());
  const [currentTheme, setCurrentTheme] = useState<Theme>(getDefaultTheme());
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  
  const [detailedPokemonId, setDetailedPokemonId] = useState<number | null>(null);
  const [detailedPokemonSpecies, setDetailedPokemonSpecies] = useState<PokemonSpecies | null>(null);
  const [detailedPokemonEvolutionChain, setDetailedPokemonEvolutionChain] = useState<EvolutionChainResponse | null>(null);
  const [isDetailViewDataLoading, setIsDetailViewDataLoading] = useState<boolean>(false);

  const [detailedGymLeaderId, setDetailedGymLeaderId] = useState<string | null>(null); // For new GymLeaderDetailView

  const [selectedPokemonForModal, setSelectedPokemonForModal] = useState<PokemonDetail | null>(null); // For old modal (e.g. from Gym Team)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // For old modal
  
  const [detailsCache, setDetailsCache] = useState<Map<number, PokemonDetail | null>>(new Map());
  const [speciesCache, setSpeciesCache] = useState<Map<string, PokemonSpecies | null>>(new Map());
  const [evolutionChainCache, setEvolutionChainCache] = useState<Map<string, EvolutionChainResponse | null>>(new Map());

  const [isInitialDataLoading, setIsInitialDataLoading] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<View>('pokedex');
  
  const [capturedPokemonIds, setCapturedPokemonIds] = useState<Set<number>>(() => {
    const storedCaptured = localStorage.getItem(CAPTURED_POKEMON_STORAGE_KEY);
    return storedCaptured ? new Set(JSON.parse(storedCaptured)) : new Set();
  });
  const [defeatedGymLeaders, setDefeatedGymLeaders] = useState<Set<string>>(() => {
    const storedDefeated = localStorage.getItem(DEFEATED_GYM_LEADERS_STORAGE_KEY);
    return storedDefeated ? new Set(JSON.parse(storedDefeated)) : new Set();
  }); 

  const uniqueRoutes = useMemo(() => getUniqueRoutes(INITIAL_POKEMON_LIST), []);

  useEffect(() => {
    document.documentElement.lang = currentLanguage === 'pt-BR' ? 'pt-BR' : 'en';
    localStorage.setItem('kalosPokedexLanguage', currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('kalosPokedexTheme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/public/sw.js', { scope: '/' }) 
          .then(registration => {
            console.log('Service Worker registrado com escopo:', registration.scope);
          })
          .catch(error => {
            console.error('Falha no registro do Service Worker:', error);
          });
      });
    }
  }, []);

  useEffect(() => {
    const fetchAllDetails = async () => {
      setIsInitialDataLoading(true);
      const newCache = new Map<number, PokemonDetail | null>();
      const allPokemonIdsToFetch = new Set<number>();
      INITIAL_POKEMON_LIST.forEach(p => allPokemonIdsToFetch.add(p.id));
      KALOS_GYM_LEADERS.forEach(leader => leader.pokemon_ids.forEach(id => allPokemonIdsToFetch.add(id)));

      const uniqueIdsArray = Array.from(allPokemonIdsToFetch);

      for (let i = 0; i < uniqueIdsArray.length; i += POKEMON_DETAILS_BATCH_SIZE) {
        const batchIds = uniqueIdsArray.slice(i, i + POKEMON_DETAILS_BATCH_SIZE);
        await Promise.allSettled(
          batchIds.map(async (id) => {
            try {
              if (!detailsCache.has(id)) { 
                const details = await getPokemonDetailsById(id);
                newCache.set(id, details);
              }
            } catch (error) {
              const pokemonFromInitialList = INITIAL_POKEMON_LIST.find(p => p.id === id);
              const nameForError = pokemonFromInitialList ? pokemonFromInitialList.name : `ID ${id}`;
              console.error(`Falha ao buscar detalhes para ${nameForError}`, error);
              newCache.set(id, null); 
            }
          })
        );
        setDetailsCache(prevCache => new Map([...Array.from(prevCache.entries()), ...Array.from(newCache.entries())]));
        
        if (i + POKEMON_DETAILS_BATCH_SIZE < uniqueIdsArray.length) {
          await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES_MS));
        }
      }
      setIsInitialDataLoading(false);
    };

    fetchAllDetails();
  }, []); 

  useEffect(() => {
    localStorage.setItem(CAPTURED_POKEMON_STORAGE_KEY, JSON.stringify(Array.from(capturedPokemonIds)));
  }, [capturedPokemonIds]);

  useEffect(() => {
    localStorage.setItem(DEFEATED_GYM_LEADERS_STORAGE_KEY, JSON.stringify(Array.from(defeatedGymLeaders)));
  }, [defeatedGymLeaders]);

  const toggleTheme = () => {
    setCurrentTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleToggleCaptured = useCallback((pokemonId: number, event?: React.MouseEvent) => {
    event?.stopPropagation(); 
    setCapturedPokemonIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(pokemonId)) {
        newSet.delete(pokemonId);
      } else {
        newSet.add(pokemonId);
      }
      return newSet;
    });
  }, []);

  const handleToggleGymLeaderDefeated = useCallback((gymLeaderId: string) => { 
    setDefeatedGymLeaders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(gymLeaderId)) {
        newSet.delete(gymLeaderId);
      } else {
        newSet.add(gymLeaderId);
      }
      return newSet;
    });
  }, []);

  const handleCardClickForDetailView = async (pokemonId: number) => {
    setDetailedPokemonId(pokemonId);
    setIsDetailViewDataLoading(true);
    setDetailedPokemonSpecies(null);
    setDetailedPokemonEvolutionChain(null);

    const pokemonDetail = detailsCache.get(pokemonId);
    if (pokemonDetail && pokemonDetail.species?.url) {
      try {
        let speciesData = speciesCache.get(pokemonDetail.species.url);
        if (!speciesData) {
          speciesData = await getPokemonSpeciesByUrl(pokemonDetail.species.url);
          if(speciesData) setSpeciesCache(prev => new Map(prev).set(pokemonDetail.species.url, speciesData!));
        }
        setDetailedPokemonSpecies(speciesData);

        if (speciesData?.evolution_chain?.url) {
          let evolutionData = evolutionChainCache.get(speciesData.evolution_chain.url);
          if(!evolutionData) {
            evolutionData = await getEvolutionChainByUrl(speciesData.evolution_chain.url);
            if(evolutionData) setEvolutionChainCache(prev => new Map(prev).set(speciesData!.evolution_chain.url, evolutionData!));
          }
          setDetailedPokemonEvolutionChain(evolutionData);
        }
      } catch (error) {
        console.error("Error fetching species/evolution data for detail view:", error);
      }
    }
    setIsDetailViewDataLoading(false);
  };

  const closeDetailView = () => {
    setDetailedPokemonId(null);
    setDetailedPokemonSpecies(null);
    setDetailedPokemonEvolutionChain(null);
  };

  const handleGymLeaderCardClick = (gymLeaderId: string) => {
    setDetailedGymLeaderId(gymLeaderId);
  };

  const closeGymLeaderDetailView = () => {
    setDetailedGymLeaderId(null);
  };
  
  const handlePokemonClickFromGymTeam = (pokemonId: number) => {
    closeGymLeaderDetailView(); // Close current gym leader view
    handleCardClickForDetailView(pokemonId); // Open Pokémon detail view
  };

  // For old modal (if still needed for any specific case, e.g. quick view from somewhere else)
   const handleOpenOldPokemonModal = (pokemonId: number) => {
    const pokemonDetail = detailsCache.get(pokemonId);
    if (pokemonDetail) {
      const basePokemonInfo = INITIAL_POKEMON_LIST.find(p => p.id === pokemonId);
      const detailWithRoutes = {
        ...pokemonDetail,
        routes: basePokemonInfo?.routes || [],
      };
      setSelectedPokemonForModal(detailWithRoutes);
      setIsModalOpen(true);
    } else {
        console.warn(`Details for Pokémon ID ${pokemonId} not found in cache. Cannot open modal.`);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemonForModal(null);
  };

  const filteredPokemon = useMemo(() => {
    return INITIAL_POKEMON_LIST.filter(pokemon => {
      const basePokemonName = pokemon.name.toLowerCase();
      const translatedPokemonName = getTranslatedPokemonName(pokemon.name, currentLanguage).toLowerCase();
      const searchLower = searchTerm.toLowerCase();

      const matchesSearchTerm = basePokemonName.includes(searchLower) ||
                                translatedPokemonName.includes(searchLower) ||
                                pokemon.id.toString().includes(searchLower);

      const matchesRoute = !selectedRoute || (pokemon.routes?.some(routeInfo => routeInfo.route === selectedRoute) ?? false);
      
      const details = detailsCache.get(pokemon.id);
      const matchesType = selectedTypes.length === 0 || 
                          (details && details.types.some(typeInfo => selectedTypes.includes(typeInfo.type.name.toLowerCase())));
      
      return matchesSearchTerm && matchesRoute && matchesType;
    });
  }, [searchTerm, selectedRoute, selectedTypes, detailsCache, currentLanguage]);

  const spinnerColor = currentTheme === 'dark' ? 'text-sky-400' : 'text-sky-600';

  const renderPokedexView = () => (
    <>
      <div className="mb-4 sm:mb-6 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 items-end">
        <div className="md:col-span-2">
          <SearchBar onSearch={setSearchTerm} initialTerm={searchTerm} currentLanguage={currentLanguage} />
        </div>
        <RouteFilter allRoutes={uniqueRoutes} selectedRoute={selectedRoute} onRouteSelect={setSelectedRoute} currentLanguage={currentLanguage} />
      </div>
      <div className="mb-4 sm:mb-6">
        <TypeFilter allTypes={STANDARD_POKEMON_TYPES} selectedTypes={selectedTypes} onTypeToggle={handleTypeToggle} currentLanguage={currentLanguage} />
      </div>

      {isInitialDataLoading && filteredPokemon.length === 0 && (
          <div className="text-center py-10">
              <LoadingSpinner size="lg" color={spinnerColor}/>
              <p className={`mt-4 themed-app-subtitle`}>{t('Loading Pokédex data...', currentLanguage)}</p>
          </div>
      )}

      {!isInitialDataLoading && filteredPokemon.length === 0 && (
        <div className="text-center py-10 px-4">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png" alt={t("No Pokémon found", currentLanguage)} className="w-24 h-24 mx-auto mb-4 opacity-50" />
          <h3 className={`text-xl font-semibold themed-app-subtitle mb-2`}>{t("No Pokémon found", currentLanguage)}</h3>
          <p className={`themed-app-subtitle`}>
            {t("Try adjusting your search or filters.", currentLanguage)}
          </p>
        </div>
      )}

      {filteredPokemon.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {filteredPokemon.map(pokemon => (
            <PokemonCard
              key={pokemon.id}
              basePokemon={pokemon}
              onCardClick={handleCardClickForDetailView} 
              initialDetails={detailsCache.get(pokemon.id)}
              isCaptured={capturedPokemonIds.has(pokemon.id)}
              onToggleCaptured={handleToggleCaptured}
              currentLanguage={currentLanguage}
            />
          ))}
        </div>
      )}
    </>
  );

  const renderGymLeadersView = () => (
    <>
      {isInitialDataLoading && KALOS_GYM_LEADERS.length > 0 && ( 
          <div className="text-center py-10">
              <LoadingSpinner size="lg" color={spinnerColor} />
              <p className={`mt-4 themed-app-subtitle`}>{t('Loading Gym Leader data...', currentLanguage)}</p>
          </div>
      )}
      {!isInitialDataLoading && (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 max-w-7xl mx-auto">
          {KALOS_GYM_LEADERS.map(gymInfo => (
            <GymLeaderCard
              key={gymInfo.id}
              gymInfo={gymInfo}
              isDefeated={defeatedGymLeaders.has(gymInfo.id)}
              onToggleDefeated={(id, event) => { event.stopPropagation(); handleToggleGymLeaderDefeated(id);}} // Keep event for card, but detail view won't need it
              onOpenModal={() => handleGymLeaderCardClick(gymInfo.id)} // Changed to new handler
              currentLanguage={currentLanguage}
            />
          ))}
        </div>
      )}
    </>
  );

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const currentPokemonForDetail = detailedPokemonId ? detailsCache.get(detailedPokemonId) : null;
  if (detailedPokemonId && currentPokemonForDetail) {
    return (
      <PokemonDetailView
        pokemonDetail={currentPokemonForDetail}
        pokemonSpecies={detailedPokemonSpecies}
        evolutionChain={detailedPokemonEvolutionChain}
        isCaptured={capturedPokemonIds.has(detailedPokemonId)}
        onToggleCaptured={handleToggleCaptured}
        onBack={closeDetailView}
        currentLanguage={currentLanguage}
        detailsCache={detailsCache}
      />
    );
  }

  const currentGymLeaderForDetail = detailedGymLeaderId ? KALOS_GYM_LEADERS.find(gl => gl.id === detailedGymLeaderId) : null;
  if (detailedGymLeaderId && currentGymLeaderForDetail) {
    return (
        <GymLeaderDetailView
            gymInfo={currentGymLeaderForDetail}
            isDefeated={defeatedGymLeaders.has(detailedGymLeaderId)}
            onToggleDefeated={handleToggleGymLeaderDefeated}
            onBack={closeGymLeaderDetailView}
            onPokemonClick={handlePokemonClickFromGymTeam}
            detailsCache={detailsCache}
            currentLanguage={currentLanguage}
        />
    );
  }
  
  // Handling loading/error for detail views
  if ((detailedPokemonId && (!currentPokemonForDetail && !isInitialDataLoading && !isDetailViewDataLoading)) ||
      (detailedGymLeaderId && (!currentGymLeaderForDetail && !isInitialDataLoading))) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 themed-app-subtitle">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png" alt="Not found" className="w-32 h-32 opacity-50 mb-4" />
            <p className="text-xl mb-2">{t("Could not load details.", currentLanguage)}</p> {/* Generic error */}
            <button
                onClick={() => { closeDetailView(); closeGymLeaderDetailView(); }}
                className="themed-nav-button themed-nav-button-inactive px-4 py-2 rounded-md shadow-md"
            >
                {t("Go back", currentLanguage)}
            </button>
        </div>
    );
  }
   if ((detailedPokemonId && (isInitialDataLoading || isDetailViewDataLoading)) || (detailedGymLeaderId && isInitialDataLoading)) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <LoadingSpinner size="lg" color={spinnerColor} />
            <p className={`mt-4 themed-app-subtitle`}>{t('Loading details...', currentLanguage)}</p> {/* Generic loading */}
        </div>
    );
  }


  return (
    <div className={`min-h-screen p-3 sm:p-5 pb-10`}>
      <header className="mb-5 sm:mb-8 text-center relative">
        <div className="absolute top-0 right-0 flex items-center space-x-2">
           <ThemeSwitcher currentTheme={currentTheme} onToggleTheme={toggleTheme} currentLanguage={currentLanguage} />
           <LanguageSwitcher currentLanguage={currentLanguage} onChangeLanguage={setCurrentLanguage} />
        </div>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="Pokéball" className="w-10 h-10 mx-auto mb-1 opacity-80" />
        <h1 className="text-3xl sm:text-4xl font-bold themed-app-title">{t('Kalos Pokédex', currentLanguage)}</h1>
        <p className="text-sm sm:text-base themed-app-subtitle mt-1">
          {currentView === 'pokedex' ? t('Explore Pokémon from a curated list.', currentLanguage) : t('Meet the Gym Leaders of the Kalos region.', currentLanguage)}
        </p>
      </header>

      <nav className="mb-4 sm:mb-6 flex justify-center space-x-2 sm:space-x-3 border-b-2 border-slate-200 dark:border-slate-700 pb-2.5 sm:pb-3">
        <button
          onClick={() => setCurrentView('pokedex')}
          className={`themed-nav-button px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-full shadow-md
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500
            ${currentView === 'pokedex' 
              ? 'themed-nav-button-active-pokedex' 
              : 'themed-nav-button-inactive'
            }`}
        >
          {t('Pokédex', currentLanguage)}
        </button>
        <button
          onClick={() => setCurrentView('gymLeaders')}
          className={`themed-nav-button px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-full shadow-md
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500
            ${currentView === 'gymLeaders' 
              ? 'themed-nav-button-active-gym' 
              : 'themed-nav-button-inactive'
            }`}
        >
          {t('Gym Leaders', currentLanguage)}
        </button>
      </nav>

      <main className="max-w-7xl mx-auto">
        {currentView === 'pokedex' ? renderPokedexView() : renderGymLeadersView()}
      </main>

      <footer className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-700 text-center text-xs themed-footer-text">
        <p>{t('Pokédex data from', currentLanguage)} <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="themed-footer-link underline">{t('PokeAPI', currentLanguage)}</a>.</p>
        <p className="mt-1">{t('This is a fan-made application. Pokémon and Pokémon character names are trademarks of Nintendo.', currentLanguage)}</p>
      </footer>

      {isModalOpen && selectedPokemonForModal && (
        <PokemonModal
          pokemon={selectedPokemonForModal}
          onClose={closeModal}
          currentLanguage={currentLanguage}
          isCaptured={capturedPokemonIds.has(selectedPokemonForModal.id)}
        />
      )}
    </div>
  );
};

export default App;
