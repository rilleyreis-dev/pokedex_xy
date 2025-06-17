import React, { useState, useEffect, useCallback } from 'react';
import { BasePokemon, PokemonDetail, PokemonType as PokemonTypeInterface, SupportedLanguage, PokemonTypeColorStyle } from '../types';
import { getPokemonDetailsById } from '../services/pokemonService';
import { POKEMON_TYPE_COLORS, OFFICIAL_ARTWORK_URL, SPRITE_URL } from '../constants';
import { getTranslatedType, t, getTranslatedPokemonName } from '../translations';
import LoadingSpinner from './LoadingSpinner';

interface PokemonCardProps {
  basePokemon: BasePokemon;
  onCardClick: (pokemonId: number) => void; 
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
  

  const primaryTypeStyle = details ? (POKEMON_TYPE_COLORS[details.types[0].type.name.toLowerCase()] || POKEMON_TYPE_COLORS['normal']) : null;
  const useSaturatedBackground = !!(primaryTypeStyle && primaryTypeStyle.saturatedColorHex);


  if (isLoading) {
    return (
      <div className="relative bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl shadow-lg flex items-center justify-start h-28 sm:h-32">
        <LoadingSpinner size="sm" color="text-sky-500 dark:text-sky-400" />
        <p className="ml-3 text-sm text-slate-500 dark:text-slate-400">{pokemonDisplayName}</p>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="relative bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 p-3 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center h-28 sm:h-32">
        <p className="font-semibold text-sm text-red-600 dark:text-red-400">{pokemonDisplayName}</p>
        <p className="text-xs text-red-500 dark:text-red-400">{error || t('Data unavailable', currentLanguage)}</p>
        {!initialDetails && (
             <button 
                onClick={fetchDetails} 
                className="mt-1 px-2 py-0.5 bg-sky-600 hover:bg-sky-500 text-white text-xs rounded-md"
            >
             {t('Retry', currentLanguage)}
            </button>
        )}
      </div>
    );
  }
  
  const cardAriaLabel = `${t('View details for', currentLanguage)} ${pokemonDisplayName}`;

  const cardBgStyle = useSaturatedBackground && primaryTypeStyle?.saturatedColorHex 
    ? { backgroundColor: primaryTypeStyle.saturatedColorHex } 
    : {};

  const cardClasses = `relative p-2.5 sm:p-3 rounded-2xl shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out cursor-pointer flex flex-row items-center justify-between h-28 sm:h-32 ${
    useSaturatedBackground 
      ? 'hover:shadow-xl' 
      : 'bg-[var(--page-bg-color)] hover:shadow-2xl hover:shadow-sky-500/40 dark:hover:shadow-sky-400/30'
  }`;


  return (
    <div
      className={cardClasses}
      style={cardBgStyle}
      onClick={() => onCardClick(details.id)} 
      role="button"
      tabIndex={0}
      onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') onCardClick(details.id);}} 
      aria-label={cardAriaLabel}
    >
      <button
        onClick={(e) => onToggleCaptured(basePokemon.id, e)}
        className={`absolute top-1.5 right-1.5 z-10 p-1 sm:p-1.5 rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2
          ${useSaturatedBackground
            ? `bg-black/20 hover:bg-black/30 backdrop-blur-sm focus:ring-white/50 focus:ring-offset-transparent`
            : `${isCaptured ? 'bg-red-500 hover:bg-red-400 focus:ring-red-500' 
                           : 'bg-slate-300/70 dark:bg-slate-600/70 hover:bg-slate-400/80 dark:hover:bg-slate-500/80 focus:ring-sky-500 opacity-60 hover:opacity-100'} focus:ring-offset-[var(--page-bg-color)]`
          }`
        }
        aria-label={isCaptured ? `${t('Unmark as captured', currentLanguage)} ${pokemonDisplayName}` : `${t('Mark as captured', currentLanguage)} ${pokemonDisplayName}`}
        aria-pressed={isCaptured}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 sm:h-4 sm:w-4 
          ${useSaturatedBackground 
            ? (isCaptured ? 'text-red-400' : 'text-white/70') 
            : (isCaptured ? 'text-white' : 'text-slate-100 dark:text-slate-300')
          }`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM4 10a6 6 0 1112 0H4zm6-4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          {isCaptured && <circle cx="10" cy="10" r={useSaturatedBackground && isCaptured ? 2.5 : 3} fill="white" />}
        </svg>
      </button>

      <div className="flex flex-col items-start justify-center flex-1 h-full mr-2 overflow-hidden py-1">
        <h3 
          className={`text-sm sm:text-base font-bold mb-1.5 truncate w-full
            ${useSaturatedBackground 
              ? 'text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.4)]' 
              : 'text-slate-700 dark:text-slate-100'}`
          } 
          title={pokemonDisplayName}
        >
          {pokemonDisplayName}
        </h3>
        <div className="flex flex-col space-y-1 items-start">
          {details.types.map((typeInfo: PokemonTypeInterface) => {
            if (useSaturatedBackground) {
              return (
                <span
                  key={typeInfo.type.name}
                  className="px-2 py-0.5 text-[0.6rem] sm:text-xs rounded-full font-medium bg-white/20 text-white backdrop-blur-sm shadow-sm"
                >
                  {getTranslatedType(typeInfo.type.name, currentLanguage)}
                </span>
              );
            } else {
              const typeColors: PokemonTypeColorStyle = POKEMON_TYPE_COLORS[typeInfo.type.name.toLowerCase()] || POKEMON_TYPE_COLORS['normal'];
              const chipStyle = typeColors.backgroundHex ? { backgroundColor: typeColors.backgroundHex } : {};
              const chipBgClass = typeColors.backgroundHex ? '' : typeColors.background; 
              return (
                <span
                  key={typeInfo.type.name}
                  style={chipStyle}
                  className={`px-2 py-0.5 text-[0.6rem] sm:text-xs rounded-full font-medium ${chipBgClass} ${typeColors.text} backdrop-blur-sm shadow-sm`}
                >
                  {getTranslatedType(typeInfo.type.name, currentLanguage)}
                </span>
              );
            }
          })}
        </div>
      </div>

      <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 relative">
         <img
            src={imageSrc}
            alt={pokemonDisplayName}
            className={`w-full h-full object-contain filter drop-shadow-lg transition-all duration-300 ${!isCaptured ? 'grayscale' : ''}`}
            onError={handleImageError}
            loading="lazy"
          />
      </div>
    </div>
  );
};

export default PokemonCard;