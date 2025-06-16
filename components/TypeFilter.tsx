
import React from 'react';
import { getTranslatedType, t } from '../translations';
import { SupportedLanguage } from '../types';
import { POKEMON_TYPE_COLORS } from '../constants'; // Import to get specific active colors

interface TypeFilterProps {
  allTypes: string[]; 
  selectedTypes: string[]; 
  onTypeToggle: (type: string) => void; 
  currentLanguage: SupportedLanguage;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ allTypes, selectedTypes, onTypeToggle, currentLanguage }) => {
  return (
    <div className="w-full">
      <p className="text-xs themed-app-subtitle mb-1.5 px-1">{t("Filter by Type(s):", currentLanguage)}</p>
      <div 
        className="flex flex-row flex-nowrap gap-2 items-center p-1 rounded-md overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 hover:scrollbar-thumb-slate-400 dark:hover:scrollbar-thumb-slate-600 scrollbar-track-slate-100 dark:scrollbar-track-slate-800/50" 
        role="group" 
        aria-label={t("Filter by Pokémon type", currentLanguage)}
      >
        {allTypes.map(type => { 
          const isActive = selectedTypes.includes(type);
          const translatedTypeName = getTranslatedType(type, currentLanguage);
          
          let activeClass = 'themed-type-filter-button-active shadow-md'; // Base active class from CSS
          let activeStyle: React.CSSProperties = {};

          if (isActive) {
            const typeColors = POKEMON_TYPE_COLORS[type.toLowerCase()] || POKEMON_TYPE_COLORS['normal'];
            if (typeColors.backgroundHex) {
              activeStyle = { backgroundColor: typeColors.backgroundHex, color: typeColors.text === 'text-slate-100' || typeColors.text === 'text-white' ? 'white' : 'black' }; // Simplified text color logic for hex
              activeClass = `shadow-md`; // Remove themed-type-filter-button-active if hex is used
            } else if (typeColors.background) {
               // If no hex, Tailwind classes from POKEMON_TYPE_COLORS will be used directly.
               // We need to ensure the text color contrasts.
               activeClass = `${typeColors.background} ${typeColors.text} shadow-md`;
            }
          }


          return (
            <button
              key={type}
              onClick={() => onTypeToggle(type)}
              type="button"
              style={isActive && activeStyle.backgroundColor ? activeStyle : {}}
              className={`
                px-3 py-1.5 text-xs rounded-full font-medium transition-colors duration-200 flex-shrink-0
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500
                ${isActive 
                  ? activeClass
                  : 'themed-type-filter-button-inactive'
                }
              `}
              aria-pressed={isActive}
              aria-label={translatedTypeName}
            >
              {translatedTypeName}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TypeFilter;
