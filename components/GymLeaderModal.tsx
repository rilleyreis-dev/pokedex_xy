
import React from 'react';
import { GymLeaderModalProps, PokemonDetail, PokemonType as PokemonTypeInterface, PokemonTypeColorStyle } from '../types';
import { POKEMON_TYPE_COLORS, SPRITE_URL, formatId } from '../constants';
import { t, getTranslatedType, getTranslatedPokemonName } from '../translations';
import LoadingSpinner from './LoadingSpinner';

const GymLeaderModal: React.FC<GymLeaderModalProps> = ({
  gymInfo,
  isOpen,
  onClose,
  onPokemonClick,
  detailsCache,
  currentLanguage,
}) => {
  if (!isOpen || !gymInfo) {
    return null;
  }

  const gymLeaderDisplayName = t(gymInfo.gym_leader_key, currentLanguage);
  const badgeDisplayName = t(gymInfo.badge_name_key, currentLanguage);
  const cityDisplayName = t(gymInfo.city_key, currentLanguage);
  const battleTips = t(gymInfo.tips_key, currentLanguage);
  
  const getTypeChip = (typeKey: string, size: 'sm' | 'md' = 'sm') => {
    const typeColors: PokemonTypeColorStyle = POKEMON_TYPE_COLORS[typeKey.toLowerCase()] || POKEMON_TYPE_COLORS['normal'];
    const textSize = size === 'sm' ? 'text-[0.6rem] sm:text-xs' : 'text-xs sm:text-sm';
    const padding = size === 'sm' ? 'px-1.5 py-0.5' : 'px-2 py-1';
    
    const chipStyle = typeColors.backgroundHex ? { backgroundColor: typeColors.backgroundHex } : {};
    const chipBgClass = typeColors.backgroundHex ? '' : typeColors.background;

    return (
      <span
        key={typeKey}
        style={chipStyle}
        className={`${padding} ${textSize} leading-tight rounded-full font-medium ${chipBgClass} ${typeColors.text} ${typeColors.border ? `border ${typeColors.border}` : ''} shadow-sm`}
      >
        {getTranslatedType(typeKey, currentLanguage)}
      </span>
    );
  };
  

  return (
    <div
      className="fixed inset-0 bg-black/60 dark:bg-black/75 flex justify-center items-center p-2.5 sm:p-4 z-50 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gym-leader-modal-title"
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 relative transform transition-all duration-300 scale-95 hover:scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors text-xl sm:text-2xl z-10"
          aria-label={t("Close modal", currentLanguage)}
        >
          &times;
        </button>

        <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-6">
          <img
            src={gymInfo.leader_image}
            alt={gymLeaderDisplayName}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-slate-200 dark:border-slate-700 shadow-lg mb-3 sm:mb-0 sm:mr-6"
          />
          <div className="text-center sm:text-left">
            <h2 id="gym-leader-modal-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-500 dark:text-yellow-400 mb-1">
              {gymLeaderDisplayName}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {cityDisplayName} - {badgeDisplayName}
            </p>
            <div className="mt-2">
              {getTypeChip(gymInfo.specialty_key, 'md')}
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-sky-700 dark:text-sky-400 mb-1.5 sm:mb-2 border-b border-slate-200 dark:border-slate-700 pb-1.5">{t("Battle Tips", currentLanguage)}</h3>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">{battleTips}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gymInfo.advantages && gymInfo.advantages.length > 0 && (
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-red-600 dark:text-red-400 mb-1.5">{t("Weak to:", currentLanguage)}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {gymInfo.advantages.map(type => getTypeChip(type, 'sm'))}
                </div>
              </div>
            )}

            {gymInfo.disadvantages && gymInfo.disadvantages.length > 0 && (
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-green-600 dark:text-green-400 mb-1.5">{t("Strong against:", currentLanguage)}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {gymInfo.disadvantages.map(type => getTypeChip(type, 'sm'))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-sky-700 dark:text-sky-400 mb-2 sm:mb-3 border-b border-slate-200 dark:border-slate-700 pb-1.5">{t("Pokémon Team", currentLanguage)}</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {gymInfo.pokemon_ids.map(pokemonId => {
                const pokemonDetail = detailsCache.get(pokemonId);
                if (!pokemonDetail) {
                  return (
                    <div key={pokemonId} className="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg shadow flex flex-col items-center justify-center h-32 text-center">
                      <LoadingSpinner size="sm" color="text-sky-600 dark:text-sky-400" />
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{formatId(pokemonId)}</p>
                    </div>
                  );
                }
                const teamMemberDisplayName = getTranslatedPokemonName(pokemonDetail.name, currentLanguage);
                return (
                  <button
                    key={pokemonId}
                    onClick={() => onPokemonClick(pokemonId)}
                    className="bg-slate-100 dark:bg-slate-700 p-2 sm:p-3 rounded-lg shadow-md hover:bg-slate-200 dark:hover:bg-slate-600/70 hover:shadow-sky-500/30 dark:hover:shadow-sky-400/20 transition-all duration-200 flex flex-col items-center text-center focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400"
                    aria-label={`${t("View details for", currentLanguage)} ${teamMemberDisplayName}`}
                  >
                    <img
                      src={pokemonDetail.sprites.front_default || SPRITE_URL(pokemonId)}
                      alt={teamMemberDisplayName}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-1 drop-shadow-md"
                      loading="lazy"
                    />
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 w-full" title={teamMemberDisplayName}>{teamMemberDisplayName}</p>
                    <div className="flex space-x-1 mt-1">
                      {pokemonDetail.types.map((typeInfo: PokemonTypeInterface) => {
                         const typeColors: PokemonTypeColorStyle = POKEMON_TYPE_COLORS[typeInfo.type.name.toLowerCase()] || POKEMON_TYPE_COLORS['normal'];
                         const chipStyle = typeColors.backgroundHex ? { backgroundColor: typeColors.backgroundHex } : {};
                         const chipBgClass = typeColors.backgroundHex ? '' : typeColors.background;
                         return (
                            <span
                                key={typeInfo.type.name}
                                style={chipStyle}
                                className={`px-1 py-0 text-[0.55rem] sm:px-1.5 sm:text-[0.6rem] leading-tight rounded-full font-medium ${chipBgClass} ${typeColors.text} shadow-sm`}
                            >
                                {getTranslatedType(typeInfo.type.name, currentLanguage)}
                            </span>
                         );
                      })}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymLeaderModal;
