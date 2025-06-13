
import React from 'react';
import { capitalize } from '../constants';

interface RouteFilterProps {
  allRoutes: string[];
  selectedRoute: string;
  onRouteSelect: (route: string) => void;
}

const RouteFilter: React.FC<RouteFilterProps> = ({ allRoutes, selectedRoute, onRouteSelect }) => {
  return (
    <div className="relative w-full">
      <select
        value={selectedRoute}
        onChange={(e) => onRouteSelect(e.target.value)}
        className="appearance-none block w-full px-3 py-1.5 text-xs bg-slate-700 text-slate-300 rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 pr-8"
        aria-label="Filter by route"
      >
        <option value="" className="bg-slate-800 text-slate-200 py-1 font-medium">
          All Routes
        </option>
        {allRoutes.map(route => (
          <option key={route} value={route} className="bg-slate-800 text-slate-200 py-1 font-medium">
            {capitalize(route)}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
        <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default RouteFilter;
