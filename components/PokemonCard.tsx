
import React, { useState, useEffect, useCallback } from 'react';
import { BasePokemon, PokemonDetail, PokemonType as PokemonTypeInterface, SupportedLanguage } from '../types';
import { getPokemonDetailsById } from '../services/pokemonService';
import { POKEMON_TYPE_COLORS, OFFICIAL_ARTWORK_URL, SPRITE_URL, formatId, capitalizeForDisplay } from '../constants';
import { getTranslatedType, t, getTranslatedPokemonName } from '../translations';
import LoadingSpinner from './LoadingSpinner';

interface PokemonCardProps {
  basePokemon: BasePokemon;
  onCardClick: (details: PokemonDetail) => void;
  initialDetails?: PokemonDetail | null;
  isCaptured: boolean;
  onToggleCaptured: (pokemonId: number, event: React.MouseEvent) => void;
  currentLanguage: SupportedLanguage;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ 
    basePokemon, 
    onCardClick, 
    initialDetails, 
    isCaptured, 
    onToggleCaptured,
    currentLanguage
}) => {
  const [details, setDetails] = useState<PokemonDetail | null>(initialDetails || null);
  const [isLoading, setIsLoading] = useState<boolean>(!initialDetails);
  const [error, setError] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string>(
    initialDetails?.sprites?.other?.['official-artwork']?.front_default || 
    initialDetails?.sprites?.front_default || 
    OFFICIAL_ARTWORK_URL(basePokemon.id)
  );

  const pokemonDisplayName = details 
    ? getTranslatedPokemonName(details.name, currentLanguage) 
    : getTranslatedPokemonName(basePokemon.name, currentLanguage);

  const fetchDetails = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPokemonDetailsById(basePokemon.id);
      setDetails(data);
      const officialArtwork = data.sprites.other?.['official-artwork']?.front_default;
      if (officialArtwork) {
        setImageSrc(officialArtwork);
      } else {
        setImageSrc(data.sprites.front_default || SPRITE_URL(basePokemon.id));
      }
    } catch (err) {
      setError(t('Failed to load data.', currentLanguage));
      console.error(`Error fetching ${basePokemon.name}:`, err);
      setImageSrc(SPRITE_URL(basePokemon.id)); 
    } finally {
      setIsLoading(false);
    }
  }, [basePokemon.id, basePokemon.name, currentLanguage]);

  useEffect(() => {
    if (!initialDetails) {
      fetchDetails();
    } else {
      setDetails(initialDetails);
      const officialArtwork = initialDetails.sprites.other?.['official-artwork']?.front_default;
      const defaultSprite = initialDetails.sprites.front_default;
      setImageSrc(officialArtwork || defaultSprite || OFFICIAL_ARTWORK_URL(initialDetails.id));
      setIsLoading(false); 
      setError(null);
    }
  }, [initialDetails, fetchDetails, basePokemon.id]);


  const handleImageError = useCallback(() => {
    if (details?.sprites.front_default && imageSrc !== details.sprites.front_default) {
        setImageSrc(details.sprites.front_default);
    } 
    else if (imageSrc !== SPRITE_URL(basePokemon.id)) {
        setImageSrc(SPRITE_URL(basePokemon.id));
    }
  }, [details, basePokemon.id, imageSrc]);
  
  const getTypeColors = (typeName: string) => {
    return POKEMON_TYPE_COLORS[typeName.toLowerCase()] || { background: 'bg-gray-300', text: 'text-black' };
  };


  if (isLoading) {
    return (
      <div className="relative bg-slate-800 p-3 sm:p-4 rounded-lg shadow-lg flex flex-col items-center justify-center aspect-[4/5] sm:aspect-square min-h-[200px] sm:min-h-[240px] transition-all duration-300 ease-in-out hover:shadow-sky-500/50">
        <LoadingSpinner size="sm" />
        <p className="mt-2 text-xs sm:text-sm text-slate-400">{pokemonDisplayName}</p>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="relative bg-slate-800 p-3 sm:p-4 rounded-lg shadow-lg flex flex-col items-center justify-center text-center aspect-[4/5] sm:aspect-square min-h-[200px] sm:min-h-[240px]">
        <img 
          src={imageSrc}
          alt={pokemonDisplayName} 
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain mb-1 sm:mb-2 opacity-70"
          onError={handleImageError} 
        />
        <p className="font-semibold text-base sm:text-lg text-red-400">{pokemonDisplayName}</p>
        <p className="text-xs text-red-400">{error || t('Data unavailable', currentLanguage)}</p>
        {!initialDetails && (
             <button 
                onClick={fetchDetails} 
                className="mt-2 px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white text-xs rounded-md"
            >
             {t('Retry', currentLanguage)}
            </button>
        )}
      </div>
    );
  }
  
  const cardAriaLabel = `${t('View details for', currentLanguage)} ${pokemonDisplayName}`;

  return (
    <div
      className="relative bg-slate-800 p-3 sm:p-4 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-sky-500/40 transform hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer flex flex-col items-center text-center"
      onClick={() => onCardClick(details)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') onCardClick(details);}}
      aria-label={cardAriaLabel}
    >
      <button
        onClick={(e) => onToggleCaptured(basePokemon.id, e)}
        className={`absolute top-2 right-2 z-10 p-1.5 rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 
          ${isCaptured ? 'bg-red-500 hover:bg-red-400 focus:ring-red-500' : 'bg-slate-600 hover:bg-slate-500 focus:ring-sky-500 opacity-60 hover:opacity-100'}`}
        aria-label={isCaptured ? `${t('Unmark as captured', currentLanguage)} ${pokemonDisplayName}` : `${t('Mark as captured', currentLanguage)} ${pokemonDisplayName}`}
        aria-pressed={isCaptured}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 sm:h-5 sm:w-5 ${isCaptured ? 'text-white' : 'text-slate-300'}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM4 10a6 6 0 1112 0H4zm6-4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          {isCaptured && <circle cx="10" cy="10" r="3" fill="white" />}
        </svg>
      </button>

      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 mb-2 sm:mb-3 relative">
         <img
            src={imageSrc}
            alt={pokemonDisplayName}
            className="w-full h-full object-contain filter drop-shadow-lg"
            onError={handleImageError}
            loading="lazy"
          />
      </div>
      <p className="text-xs text-slate-400 font-medium">{formatId(details.id)}</p>
      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-sky-300 mb-1.5 sm:mb-2 truncate w-full" title={pokemonDisplayName}>{pokemonDisplayName}</h3>
      <div className="flex space-x-1.5 sm:space-x-2 justify-center">
        {details.types.map((typeInfo: PokemonTypeInterface) => {
          const colors = getTypeColors(typeInfo.type.name);
          return (
            <span
              key={typeInfo.type.name}
              className={`px-2 py-0.5 text-[0.6rem] leading-tight sm:text-xs sm:px-2.5 rounded-full font-medium ${colors.background} ${colors.text} ${colors.border ? `border ${colors.border}` : ''} shadow-sm`}
            >
              {getTranslatedType(typeInfo.type.name, currentLanguage)}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonCard;
