
import React from 'react';
import { getTranslatedType, t } from '../translations';
import { SupportedLanguage } from '../types';
import { POKEMON_TYPE_COLORS } from '../constants';

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
          const typeColors = POKEMON_TYPE_COLORS[type.toLowerCase()] || POKEMON_TYPE_COLORS['normal'];
          
          const buttonStyle: React.CSSProperties = {};
          let buttonClasses: string[] = [
            'px-3', 'py-1.5', 'text-xs', 'rounded-full', 'font-medium',
            'transition-all', 'duration-200', 'ease-in-out',
            'flex-shrink-0', 'focus:outline-none', 'focus:ring-2',
            'focus:ring-offset-2', 'focus:ring-offset-[var(--page-bg-color)]', // Theme-aware offset
            'focus:ring-sky-500', 'dark:focus:ring-sky-400',
            'border-2' // Base border for all
          ];

          // Apply the consistent text color
          buttonClasses.push(typeColors.text || POKEMON_TYPE_COLORS['normal'].text);
          buttonStyle.borderColor = typeColors.backgroundHex || POKEMON_TYPE_COLORS['normal'].backgroundHex;

          if (isActive) {
            buttonStyle.backgroundColor = typeColors.backgroundHex || POKEMON_TYPE_COLORS['normal'].backgroundHex;
            // Border color is already set and matches background for a filled look
            buttonClasses.push('shadow-md');
          } else {
            // Unselected (hollow)
            buttonStyle.backgroundColor = 'transparent';
            // Border color and text color are already set
            
            // Hover effect for unselected: fill on hover
            const hoverBgClass = `hover:bg-[${typeColors.backgroundHex || POKEMON_TYPE_COLORS['normal'].backgroundHex}]`;
            // Text color class is already applied, so it remains correct on hover when background fills.
            buttonClasses.push(hoverBgClass);
          }

          return (
            <button
              key={type}
              onClick={() => onTypeToggle(type)}
              type="button"
              style={buttonStyle}
              className={buttonClasses.join(' ')}
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
