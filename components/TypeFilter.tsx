
import React from 'react';
import { capitalize } from '../constants';

interface TypeFilterProps {
  allTypes: string[];
  selectedTypes: string[]; // Changed from selectedType
  onTypeToggle: (type: string) => void; // Changed from onTypeSelect
}

const TypeFilter: React.FC<TypeFilterProps> = ({ allTypes, selectedTypes, onTypeToggle }) => {
  return (
    <div className="w-full">
      <p className="text-xs text-slate-400 mb-1.5 px-1">Filter by Type(s):</p>
      <div 
        className="flex flex-wrap gap-2 items-center p-1 rounded-md" 
        role="group" 
        aria-label="Filter by Pokémon type"
      >
        {allTypes.map(type => {
          const isActive = selectedTypes.includes(type);
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
              aria-label={capitalize(type)}
            >
              {capitalize(type)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TypeFilter;
