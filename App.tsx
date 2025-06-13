
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { INITIAL_POKEMON_LIST, getUniqueRoutes, STANDARD_POKEMON_TYPES, capitalize, formatId, KALOS_GYM_LEADERS, capitalizeForDisplay } from './constants';
import { BasePokemon, PokemonDetail, GymLeaderInfo, SupportedLanguage } from './types';
import { getPokemonDetailsById } from './services/pokemonService';
import { t, getTranslatedType, getTranslatedPokemonName } from './translations';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';
import SearchBar from './components/SearchBar';
import RouteFilter from './components/RouteFilter';
import TypeFilter from './components/TypeFilter';
import LoadingSpinner from './components/LoadingSpinner';
import GymLeaderCard from './components/GymLeaderCard';
import LanguageSwitcher from './components/LanguageSwitcher';

type View = 'pokedex' | 'gymLeaders';

const getDefaultLanguage = (): SupportedLanguage => {
  const storedLang = localStorage.getItem('kalosPokedexLanguage') as SupportedLanguage | null;
  if (storedLang && (storedLang === 'en' || storedLang === 'pt-BR')) {
    return storedLang;
  }
  const browserLang = navigator.language.split('-')[0];
  return browserLang === 'pt' ? 'pt-BR' : 'en';
};


const App: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(getDefaultLanguage());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const [detailsCache, setDetailsCache] = useState<Map<number, PokemonDetail | null>>(new Map());
  const [isInitialDataLoading, setIsInitialDataLoading] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<View>('pokedex');
  const [capturedPokemonIds, setCapturedPokemonIds] = useState<Set<number>>(new Set());
  const [defeatedGymLeaders, setDefeatedGymLeaders] = useState<Set<string>>(new Set()); 

  const uniqueRoutes = useMemo(() => getUniqueRoutes(INITIAL_POKEMON_LIST), []);

  useEffect(() => {
    document.documentElement.lang = currentLanguage === 'pt-BR' ? 'pt-BR' : 'en';
    localStorage.setItem('kalosPokedexLanguage', currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/public/sw.js')
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
      const cache = new Map<number, PokemonDetail | null>();
      await Promise.allSettled(
        INITIAL_POKEMON_LIST.map(async (pokemon) => {
          try {
            const details = await getPokemonDetailsById(pokemon.id);
            cache.set(pokemon.id, details);
          } catch (error) {
            console.error(`Falha ao buscar detalhes para ${pokemon.name} (ID: ${pokemon.id})`, error);
            cache.set(pokemon.id, null); 
          }
        })
      );
      setDetailsCache(cache);
      setIsInitialDataLoading(false);
    };

    fetchAllDetails();
  }, []);


  const handleToggleCaptured = useCallback((pokemonId: number, event: React.MouseEvent) => {
    event.stopPropagation(); 
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

  const handleToggleGymLeaderDefeated = useCallback((gymLeaderId: string, event: React.MouseEvent) => { 
    event.stopPropagation();
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


  const filteredPokemon = useMemo(() => {
    if (currentView !== 'pokedex' || (isInitialDataLoading && detailsCache.size === 0)) { 
        return [];
    }

    let pokemonToFilter = INITIAL_POKEMON_LIST;

    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase().trim();
      pokemonToFilter = pokemonToFilter.filter(pokemon =>
        pokemon.name.toLowerCase().includes(lowerSearchTerm) || 
        getTranslatedPokemonName(pokemon.name, currentLanguage).toLowerCase().includes(lowerSearchTerm) ||
        pokemon.id.toString().includes(lowerSearchTerm) ||
        formatId(pokemon.id).includes(lowerSearchTerm)
      );
    }

    if (selectedRoute) { 
      pokemonToFilter = pokemonToFilter.filter(pokemon =>
        pokemon.routes && pokemon.routes.includes(selectedRoute)
      );
    }

    if (selectedTypes.length > 0) { 
      pokemonToFilter = pokemonToFilter.filter(pokemon => {
        const details = detailsCache.get(pokemon.id);
        if (!details) return false; 
        return details.types.some(typeInfo => selectedTypes.includes(typeInfo.type.name)); 
      });
    }
    
    return pokemonToFilter;
  }, [currentView, searchTerm, selectedRoute, selectedTypes, detailsCache, isInitialDataLoading, currentLanguage]);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleRouteSelect = useCallback((route: string) => { 
    setSelectedRoute(route);
  }, []);

  const handleTypeToggle = useCallback((type: string) => {  
    setSelectedTypes(prevSelectedTypes => {
      if (prevSelectedTypes.includes(type)) {
        return prevSelectedTypes.filter(t => t !== type); 
      } else {
        return [...prevSelectedTypes, type]; 
      }
    });
  }, []);

  const handleCardClick = useCallback((pokemonDetailsFromCard: PokemonDetail) => {
    const baseData = INITIAL_POKEMON_LIST.find(p => p.id === pokemonDetailsFromCard.id);
    const cachedData = detailsCache.get(pokemonDetailsFromCard.id);

    const finalDetails = {
        ...(cachedData || pokemonDetailsFromCard), 
        routes: baseData?.routes || (cachedData || pokemonDetailsFromCard).routes || [] 
    };

    setSelectedPokemon(finalDetails);
    setIsModalOpen(true);
  }, [detailsCache]);
  
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
        document.body.classList.remove('overflow-hidden');
    };
  }, [isModalOpen]);


  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPokemon(null), 300);
  }, []);
  
  const formatSelectedTypesMessage = () => {
    if (selectedTypes.length === 0) return '';
    const translatedSelectedTypes = selectedTypes.map(type => getTranslatedType(type, currentLanguage));
    if (translatedSelectedTypes.length === 1) return ` ${t('of type', currentLanguage)} ${translatedSelectedTypes[0]}`;
    
    const lastType = translatedSelectedTypes[translatedSelectedTypes.length - 1];
    const initialTypes = translatedSelectedTypes.slice(0, -1);
    const conjunction = currentLanguage === 'pt-BR' ? 'e' : 'and';
    return ` ${t('of types', currentLanguage)} ${initialTypes.join(', ')} ${conjunction} ${lastType}`;
  };
  
  const handleChangeLanguage = (lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    // No longer need to reset gymLeaderStrategies as it's removed
  };


  const renderPokedexView = () => (
    <>
      <div className="flex flex-col md:flex-row flex-wrap gap-4 items-start mb-6 sm:mb-8 w-full max-w-4xl mx-auto">
        <div className="w-full md:flex-1 md:min-w-[250px]">
          <SearchBar onSearch={handleSearch} currentLanguage={currentLanguage} />
        </div>
        <div className="w-full sm:w-auto md:min-w-[180px]">
          <RouteFilter 
            allRoutes={uniqueRoutes} 
            selectedRoute={selectedRoute} 
            onRouteSelect={handleRouteSelect} 
            currentLanguage={currentLanguage}
          />
        </div>
        <div className="w-full md:flex-1 md:min-w-[300px]">
          <TypeFilter 
            allTypes={STANDARD_POKEMON_TYPES} 
            selectedTypes={selectedTypes} 
            onTypeToggle={handleTypeToggle} 
            currentLanguage={currentLanguage}
          />
        </div>
      </div>
      
      {isInitialDataLoading ? (
        <div className="text-center py-20">
          <LoadingSpinner size="lg" />
          <p className="text-slate-400 mt-4 text-lg">{t("Loading Pokédex data...", currentLanguage)}</p>
        </div>
      ) : filteredPokemon.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
          {filteredPokemon.map((pokemon: BasePokemon) => (
            <PokemonCard
              key={pokemon.id}
              basePokemon={pokemon}
              onCardClick={handleCardClick}
              initialDetails={detailsCache.get(pokemon.id)}
              isCaptured={capturedPokemonIds.has(pokemon.id)}
              onToggleCaptured={handleToggleCaptured}
              currentLanguage={currentLanguage}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 sm:py-12">
          <p className="text-xl sm:text-2xl text-slate-500 mb-2">
            {t("No Pokémon found", currentLanguage)}
            {searchTerm.trim() && ` ${t('for', currentLanguage)} "${capitalizeForDisplay(searchTerm, currentLanguage)}"`}
            {selectedRoute && ` ${t('on', currentLanguage)} ${capitalize(selectedRoute)}`} 
            {formatSelectedTypesMessage()}
          </p>
          <p className="text-slate-600 text-sm sm:text-base">{t("Try adjusting your search or filters.", currentLanguage)}</p>
           <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png" alt={t("Unknown Pokémon", currentLanguage)} className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mt-4 opacity-50"/>
        </div>
      )}
    </>
  );

  const renderGymLeadersView = () => (
    <section className="my-6 sm:my-8">
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 max-w-7xl mx-auto">
        {KALOS_GYM_LEADERS.map((gymLeader) => ( 
          <GymLeaderCard 
            key={gymLeader.id} 
            gymInfo={gymLeader}
            isDefeated={defeatedGymLeaders.has(gymLeader.id)}
            onToggleDefeated={handleToggleGymLeaderDefeated}
            currentLanguage={currentLanguage}
          />
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-6 lg:p-8">
      <header className="mb-6 sm:mb-8 pt-3 sm:pt-4 px-2">
        {/* Main Header Flex Container: Handles mobile (column) and sm+ (row) layouts */}
        <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          
          {/* Language Switcher container: First in DOM for mobile order. order-3 for sm+ (right align) */}
          <div className="w-full flex justify-end sm:w-auto sm:flex-shrink-0 sm:order-3 z-10">
             <LanguageSwitcher currentLanguage={currentLanguage} onChangeLanguage={handleChangeLanguage} />
          </div>

          {/* Left Spacer: Hidden on mobile. order-1 for sm+ (left align) */}
          <div className="hidden sm:block sm:w-20 md:w-24 lg:w-32 xl:w-40 flex-shrink-0 sm:order-1"></div> {/* Adjusted width to accommodate larger title */}

          {/* Title group: order-2 for sm+ (center). Centered on mobile by parent's items-center. */}
          <div className="text-center w-full sm:w-auto sm:flex-grow sm:order-2">
            <div className="inline-flex items-center justify-center space-x-1 xs:space-x-2 sm:space-x-3">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
                alt={t("Pokéball", currentLanguage)} 
                className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex-shrink-0"
              />
              <h1 
                className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-sky-400 tracking-tight truncate"
              >
                {t("Kalos Pokédex", currentLanguage)}
              </h1>
            </div>
          </div>

        </div>

        {/* Subtitle - remains centered below the main bar */}
        <div className="text-center">
          {currentView === 'pokedex' && (
              <p className="text-slate-400 mt-2 text-xs sm:text-sm md:text-lg">{t("Explore Pokémon from a curated list.", currentLanguage)}</p>
          )}
          {currentView === 'gymLeaders' && (
              <p className="text-slate-400 mt-2 text-xs sm:text-sm md:text-lg">{t("Meet the Gym Leaders of the Kalos region.", currentLanguage)}</p>
          )}
        </div>
      </header>

      <nav className="flex justify-center space-x-3 sm:space-x-4 border-b border-slate-700 mb-6 sm:mb-8 pb-4 sm:pb-6">
        <button
          onClick={() => setCurrentView('pokedex')}
          className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75
            ${currentView === 'pokedex' ? 'bg-sky-500 text-white shadow-lg transform scale-105' : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-sky-400 hover:shadow-md'}`}
          aria-pressed={currentView === 'pokedex'}
        >
          {t("Pokédex", currentLanguage)}
        </button>
        <button
          onClick={() => setCurrentView('gymLeaders')}
          className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75
            ${currentView === 'gymLeaders' ? 'bg-yellow-500 text-white shadow-lg transform scale-105' : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-yellow-400 hover:shadow-md'}`}
          aria-pressed={currentView === 'gymLeaders'}
        >
          {t("Gym Leaders", currentLanguage)}
        </button>
      </nav>

      <main>
        {currentView === 'pokedex' && renderPokedexView()}
        {currentView === 'gymLeaders' && renderGymLeadersView()}
      </main>

      {isModalOpen && selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={closeModal} currentLanguage={currentLanguage} />
      )}

      <footer className="text-center mt-12 sm:mt-16 py-6 sm:py-8 border-t border-slate-700">
        <p className="text-slate-500 text-xs sm:text-sm">
          {t("Pokédex data from", currentLanguage)} <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-400">PokeAPI</a>.
        </p>
        <p className="text-slate-600 text-[0.65rem] sm:text-xs mt-1">
          {t("This is a fan-made application. Pokémon and Pokémon character names are trademarks of Nintendo.", currentLanguage)}
        </p>
      </footer>
    </div>
  );
};

export default App;