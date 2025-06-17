
import React, { useState } from 'react';
import { 
    GymLeaderInfo, GymLeaderDetailViewProps, PokemonDetail, 
    PokemonTypeColorStyle, PokemonType as PokemonTypeInterface
} from '../types';
import { POKEMON_TYPE_COLORS, SPRITE_URL, formatId } from '../constants';
import { t, getTranslatedType, getTranslatedPokemonName } from '../translations';
import LoadingSpinner from './LoadingSpinner';

const GymLeaderDetailView: React.FC<GymLeaderDetailViewProps> = ({
  gymInfo,
  isDefeated,
  onToggleDefeated,
  onBack,
  onPokemonClick,
  detailsCache,
  currentLanguage,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'team'>('info');

  const gymLeaderDisplayName = t(gymInfo.gym_leader_key, currentLanguage);
  const badgeDisplayName = t(gymInfo.badge_name_key, currentLanguage);
  const cityDisplayName = t(gymInfo.city_key, currentLanguage);
  const battleTips = t(gymInfo.tips_key, currentLanguage);

  const specialtyTypeName = gymInfo.specialty_key.toLowerCase();
  const typeStyle = POKEMON_TYPE_COLORS[specialtyTypeName] || POKEMON_TYPE_COLORS['normal'];
  const saturatedBgColor = typeStyle.saturatedColorHex || '#A9A9A9'; // Fallback to dark gray

  const tabButtonClass = (tabName: typeof activeTab) =>
    `px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors duration-200 
     ${activeTab === tabName 
       ? 'border-[var(--detail-tab-active-border)] text-[var(--detail-tab-active-text)]' 
       : 'border-transparent text-[var(--detail-tab-inactive-text)] hover:text-[var(--detail-tab-inactive-hover-text)]'}`;

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
    <div style={{ backgroundColor: saturatedBgColor }} className="min-h-screen w-full overflow-y-auto">
      {/* Top Section on Colored Background */}
      <div className="container mx-auto px-4 sm:px-6 pt-5 pb-4 sm:pb-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-black/10 transition-colors"
            aria-label={t('Back to list', currentLanguage)} // Assuming this key exists or will be added
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => onToggleDefeated(gymInfo.id)}
            className={`p-1.5 rounded-full transition-colors bg-black/20 hover:bg-black/30 backdrop-blur-sm ${isDefeated ? 'text-green-400 hover:text-green-300' : 'text-white/70 hover:text-white'}`}
            aria-label={isDefeated ? t('Unmark as defeated', currentLanguage) : t('Mark as defeated', currentLanguage)}
            aria-pressed={isDefeated}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {isDefeated ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                // Simple circle for not defeated, or use a more distinct "not checked" icon
                // <circle cx="12" cy="12" r="8" strokeOpacity="0.5" />
              )}
            </svg>
          </button>
        </div>

        <div className="text-center sm:text-left mb-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold [text-shadow:1px_1px_3px_rgba(0,0,0,0.4)]">{gymLeaderDisplayName}</h1>
          <p className="text-md sm:text-lg [text-shadow:1px_1px_2px_rgba(0,0,0,0.2)]">{badgeDisplayName}</p>
          <p className="text-sm sm:text-md text-white/80 [text-shadow:1px_1px_2px_rgba(0,0,0,0.2)]">{cityDisplayName}</p>
        </div>
      </div>

      {/* Gym Leader Image */}
      <div className="relative z-10 flex justify-center -mb-12 sm:-mb-16 md:-mb-20">
        <img
          src={gymInfo.leader_image}
          alt={gymLeaderDisplayName}
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain filter drop-shadow-2xl rounded-full border-4 border-white/50 dark:border-slate-800/50"
        />
      </div>

      {/* Information Card */}
      <div className="bg-[var(--page-bg-color)] w-full max-w-4xl mx-auto rounded-t-2xl sm:rounded-t-3xl shadow-xl pt-16 sm:pt-20 md:pt-24 p-4 sm:p-6 pb-8">
        {/* Tabs Navigation */}
        <div className="mb-6 border-b border-slate-200 dark:border-slate-700 flex justify-center">
          <button onClick={() => setActiveTab('info')} className={tabButtonClass('info')} aria-controls="tab-content-info" aria-selected={activeTab === 'info'}>{t('Info', currentLanguage)}</button>
          <button onClick={() => setActiveTab('team')} className={tabButtonClass('team')} aria-controls="tab-content-team" aria-selected={activeTab === 'team'}>{t('Pokémon Team', currentLanguage)}</button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[200px]">
          {activeTab === 'info' && (
            <div id="tab-content-info" role="tabpanel" className="space-y-5 animate-fadeIn">
              <div>
                <h4 className="font-semibold text-[var(--detail-section-header-text)] mb-1.5">{t('Battle Tips', currentLanguage)}</h4>
                <p className="text-sm text-[var(--detail-content-text)] leading-relaxed">{battleTips}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gymInfo.advantages && gymInfo.advantages.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-[var(--detail-section-header-text)] mb-1.5">{t('Weak to:', currentLanguage)}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {gymInfo.advantages.map(type => getTypeChip(type, 'sm'))}
                    </div>
                  </div>
                )}
                {gymInfo.disadvantages && gymInfo.disadvantages.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-[var(--detail-section-header-text)] mb-1.5">{t('Strong against:', currentLanguage)}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {gymInfo.disadvantages.map(type => getTypeChip(type, 'sm'))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {activeTab === 'team' && (
            <div id="tab-content-team" role="tabpanel" className="animate-fadeIn">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {gymInfo.pokemon_ids.map(pokemonId => {
                  const pokemonDetail = detailsCache.get(pokemonId);
                  if (!pokemonDetail) {
                    return (
                      <div key={pokemonId} className="bg-slate-100 dark:bg-slate-700/60 p-2 rounded-lg shadow-inner flex flex-col items-center justify-center h-36 text-center">
                        <LoadingSpinner size="sm" />
                        <p className="text-xs text-[var(--detail-tab-inactive-text)] mt-1">{formatId(pokemonId)}</p>
                      </div>
                    );
                  }
                  const teamMemberDisplayName = getTranslatedPokemonName(pokemonDetail.name, currentLanguage);
                  return (
                    <button
                      key={pokemonId}
                      onClick={() => onPokemonClick(pokemonId)}
                      className="bg-slate-100 dark:bg-slate-700/60 p-2 sm:p-3 rounded-lg shadow-md hover:bg-slate-200 dark:hover:bg-slate-600/70 hover:shadow-sky-500/30 dark:hover:shadow-sky-400/20 transition-all duration-200 flex flex-col items-center text-center focus:outline-none focus:ring-2 ring-sky-500 dark:ring-sky-400 ring-offset-2 ring-offset-[var(--page-bg-color)]"
                      aria-label={`${t("View details for", currentLanguage)} ${teamMemberDisplayName}`}
                    >
                      <img
                        src={pokemonDetail.sprites.front_default || SPRITE_URL(pokemonId)}
                        alt={teamMemberDisplayName}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-1 drop-shadow-md"
                        loading="lazy"
                        onError={(e) => (e.currentTarget.src = SPRITE_URL(pokemonId))}
                      />
                      <p className="text-xs sm:text-sm font-semibold text-[var(--detail-content-text)] w-full truncate" title={teamMemberDisplayName}>{teamMemberDisplayName}</p>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default GymLeaderDetailView;
