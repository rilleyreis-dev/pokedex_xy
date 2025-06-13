
import React from 'react';
import { GymLeaderInfo } from '../types';
import { POKEMON_TYPE_COLORS, capitalize } from '../constants';

interface GymLeaderCardProps {
  gymInfo: GymLeaderInfo;
  isDefeated: boolean;
  onToggleDefeated: (gymLeaderName: string, event: React.MouseEvent) => void;
}

const specialtyToTypeKey: { [key: string]: string } = {
  "Inseto": "bug",
  "Pedra": "rock",
  "Lutador": "fighting",
  "Grama": "grass",
  "Elétrico": "electric",
  "Fada": "fairy",
  "Psíquico": "psychic",
  "Gelo": "ice",
};

const GymLeaderCard: React.FC<GymLeaderCardProps> = ({ gymInfo, isDefeated, onToggleDefeated }) => {
  const typeKey = specialtyToTypeKey[gymInfo.specialty] || gymInfo.specialty.toLowerCase();
  const typeColors = POKEMON_TYPE_COLORS[typeKey] || POKEMON_TYPE_COLORS['normal'];

  return (
    <div className="relative bg-slate-800 p-3 sm:p-4 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl hover:shadow-yellow-500/40 transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
      <button
        onClick={(e) => onToggleDefeated(gymInfo.gym_leader, e)}
        className={`absolute top-2 right-2 z-10 p-1 rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800
          ${isDefeated ? 'bg-green-500 hover:bg-green-400 focus:ring-green-500' : 'bg-slate-600 hover:bg-slate-500 focus:ring-sky-500 opacity-70 hover:opacity-100'}`}
        aria-label={isDefeated ? `Unmark ${gymInfo.gym_leader} as defeated` : `Mark ${gymInfo.gym_leader} as defeated`}
        aria-pressed={isDefeated}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 sm:h-5 sm:w-5 ${isDefeated ? 'text-white' : 'text-slate-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </button>

      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-2 sm:mb-3 relative">
        <img 
          src={gymInfo.badge_image} 
          alt={gymInfo.badge_name} 
          className={`w-full h-full object-contain filter drop-shadow-lg transition-all duration-300 ${!isDefeated ? 'grayscale' : ''}`}
          loading="lazy"
        />
      </div>
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-yellow-400 mb-1 sm:mb-1.5 truncate w-full" title={gymInfo.gym_leader}>{gymInfo.gym_leader}</h3>
      <p className="text-xs text-slate-400 font-medium mb-0.5 sm:mb-1">{gymInfo.badge_name}</p>
      <p className="text-xs text-slate-500 mb-1.5 sm:mb-2">{gymInfo.city}</p>
      
      <div className="flex justify-center mt-1 sm:mt-1.5">
        <span
            className={`px-2 py-0.5 text-[0.6rem] leading-tight sm:text-xs sm:px-2.5 rounded-full font-medium ${typeColors.background} ${typeColors.text} ${typeColors.border ? `border ${typeColors.border}` : ''} shadow-sm`}
        >
            {capitalize(gymInfo.specialty)}
        </span>
      </div>
    </div>
  );
};

export default GymLeaderCard;
