import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { INITIAL_POKEMON_LIST, getUniqueRoutes, STANDARD_POKEMON_TYPES, capitalize, formatId, KALOS_GYM_LEADERS } from './constants';
import { BasePokemon, PokemonDetail, GymLeaderInfo } from './types';
import { getPokemonDetailsById } from './services/pokemonService';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';
import SearchBar from './components/SearchBar';
import RouteFilter from './components/RouteFilter';
import TypeFilter from './components/TypeFilter';
import LoadingSpinner from './components/LoadingSpinner';
import GymLeaderCard from './components/GymLeaderCard';

type View = 'pokedex' | 'gymLeaders';

const App: React.FC = () => {
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
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch(error => {
            console.error('Service Worker registration failed:', error);
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
            console.error(`Failed to fetch details for ${pokemon.name} (ID: ${pokemon.id})`, error);
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

  const handleToggleGymLeaderDefeated = useCallback((gymLeaderName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setDefeatedGymLeaders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(gymLeaderName)) {
        newSet.delete(gymLeaderName);
      } else {
        newSet.add(gymLeaderName);
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
  }, [currentView, searchTerm, selectedRoute, selectedTypes, detailsCache, isInitialDataLoading]);

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
    if (selectedTypes.length === 1) return ` of type ${capitalize(selectedTypes[0])}`;
    const lastType = selectedTypes[selectedTypes.length - 1];
    const initialTypes = selectedTypes.slice(0, -1);
    return ` of types ${initialTypes.map(capitalize).join(', ')} & ${capitalize(lastType)}`;
  };

  const renderPokedexView = () => (
    <>
      <div className="flex flex-col md:flex-row flex-wrap gap-4 items-start mb-6 sm:mb-8 w-full max-w-4xl mx-auto">
        <div className="w-full md:flex-1 md:min-w-[250px]">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="w-full sm:w-auto md:min-w-[180px]">
          <RouteFilter 
            allRoutes={uniqueRoutes} 
            selectedRoute={selectedRoute} 
            onRouteSelect={handleRouteSelect} 
          />
        </div>
        <div className="w-full md:flex-1 md:min-w-[300px]">
          <TypeFilter 
            allTypes={STANDARD_POKEMON_TYPES}
            selectedTypes={selectedTypes} 
            onTypeToggle={handleTypeToggle} 
          />
        </div>
      </div>
      
      {isInitialDataLoading ? (
        <div className="text-center py-20">
          <LoadingSpinner size="lg" />
          <p className="text-slate-400 mt-4 text-lg">Loading Pokédex data...</p>
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
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 sm:py-12">
          <p className="text-xl sm:text-2xl text-slate-500 mb-2">
            No Pokémon found
            {searchTerm.trim() && ` for "${capitalize(searchTerm)}"`}
            {selectedRoute && ` on ${capitalize(selectedRoute)}`}
            {formatSelectedTypesMessage()}
          </p>
          <p className="text-slate-600 text-sm sm:text-base">Try adjusting your search or filters.</p>
           <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png" alt="Unknown Pokemon" className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mt-4 opacity-50"/>
        </div>
      )}
    </>
  );

  const renderGymLeadersView = () => (
    <section className="my-6 sm:my-8">
       <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-7xl mx-auto">
        {KALOS_GYM_LEADERS.map((gymLeader) => (
          <GymLeaderCard 
            key={gymLeader.gym_leader} 
            gymInfo={gymLeader}
            isDefeated={defeatedGymLeaders.has(gymLeader.gym_leader)}
            onToggleDefeated={handleToggleGymLeaderDefeated}
          />
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-6 lg:p-8">
      <header className="text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="Pokeball" className="w-10 h-10 sm:w-12 md:w-16 md:h-16"/>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sky-400 tracking-tight">
              Kalos Pokédex
            </h1>
        </div>
        {currentView === 'pokedex' && (
            <p className="text-slate-400 mt-2 text-sm sm:text-base md:text-lg">Explore Pokémon from a curated list.</p>
        )}
        {currentView === 'gymLeaders' && (
            <p className="text-slate-400 mt-2 text-sm sm:text-base md:text-lg">Meet the Gym Leaders of the Kalos region.</p>
        )}
      </header>

      <nav className="flex justify-center space-x-3 sm:space-x-4 border-b border-slate-700 mb-6 sm:mb-8 pb-4 sm:pb-6">
        <button
          onClick={() => setCurrentView('pokedex')}
          className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75
            ${currentView === 'pokedex' ? 'bg-sky-500 text-white shadow-lg transform scale-105' : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-sky-400 hover:shadow-md'}`}
          aria-pressed={currentView === 'pokedex'}
        >
          Pokédex
        </button>
        <button
          onClick={() => setCurrentView('gymLeaders')}
          className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75
            ${currentView === 'gymLeaders' ? 'bg-yellow-500 text-white shadow-lg transform scale-105' : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-yellow-400 hover:shadow-md'}`}
          aria-pressed={currentView === 'gymLeaders'}
        >
          Gym Leaders
        </button>
      </nav>

      <main>
        {currentView === 'pokedex' && renderPokedexView()}
        {currentView === 'gymLeaders' && renderGymLeadersView()}
      </main>

      {isModalOpen && selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={closeModal} />
      )}

      <footer className="text-center mt-12 sm:mt-16 py-6 sm:py-8 border-t border-slate-700">
        <p className="text-slate-500 text-xs sm:text-sm">
          Pokédex data from <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-400">PokeAPI</a>.
        </p>
        <p className="text-slate-600 text-[0.65rem] sm:text-xs mt-1">
          This is a fan-made application. Pokémon and Pokémon character names are trademarks of Nintendo.
        </p>
      </footer>
    </div>
  );
};

export default App;