
import React from 'react';
import { getTranslatedType, t } from '../translations';
import { SupportedLanguage } from '../types';

interface TypeFilterProps {
  allTypes: string[]; // English type names from STANDARD_POKEMON_TYPES
  selectedTypes: string[]; 
  onTypeToggle: (type: string) => void; 
  currentLanguage: SupportedLanguage;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ allTypes, selectedTypes, onTypeToggle, currentLanguage }) => {
  return (
    <div className="w-full">
      <p className="text-xs text-slate-400 mb-1.5 px-1">{t("Filter by Type(s):", currentLanguage)}</p>
      <div 
        className="flex flex-wrap gap-2 items-center p-1 rounded-md" 
        role="group" 
        aria-label={t("Filter by Pokémon type", currentLanguage)}
      >
        {allTypes.map(type => { 
          const isActive = selectedTypes.includes(type);
          const translatedTypeName = getTranslatedType(type, currentLanguage);
          return (
            <button
              key={type}
              onClick={() => onTypeToggle(type)}
              type="button"
              className={`
                px-3 py-1.5 text-xs rounded-full font-medium transition-colors duration-200 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500
                ${isActive 
                  ? 'bg-sky-500 text-white shadow-md' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-slate-100'
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
