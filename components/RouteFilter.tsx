
import React from 'react';
import { capitalize } from '../constants';
import { t } from '../translations';
import { SupportedLanguage } from '../types';

interface RouteFilterProps {
  allRoutes: string[]; 
  selectedRoute: string;
  onRouteSelect: (route: string) => void;
  currentLanguage: SupportedLanguage;
}

const RouteFilter: React.FC<RouteFilterProps> = ({ allRoutes, selectedRoute, onRouteSelect, currentLanguage }) => {
  return (
    <div className="relative w-full">
      <select
        value={selectedRoute}
        onChange={(e) => onRouteSelect(e.target.value)}
        className="themed-select appearance-none block w-full px-3 py-1.5 text-xs rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-sky-400 pr-8"
        aria-label={t("Filter by route", currentLanguage)}
      >
        <option value="" className="themed-input py-1 font-medium"> {/* Use themed-input for option styling too */}
          {t("All Routes", currentLanguage)}
        </option>
        {allRoutes.map(route => ( 
          <option key={route} value={route} className="themed-input py-1 font-medium">
            {capitalize(route)}
          </option>
        ))}
      </select>
      <div className="themed-select-arrow pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5">
        <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default RouteFilter;