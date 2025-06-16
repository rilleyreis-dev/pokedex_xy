
import React, { useState } from 'react';
import { t } from '../translations';
import { SupportedLanguage } from '../types';

interface SearchBarProps {
  onSearch: (term: string) => void;
  initialTerm?: string;
  currentLanguage: SupportedLanguage;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialTerm = '', currentLanguage }) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialTerm);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = event.target.value;
    setSearchTerm(newTerm);
    onSearch(newTerm);
  };

  return (
    <input
      type="text"
      placeholder={t('Search Pokémon by name or ID...', currentLanguage)}
      value={searchTerm}
      onChange={handleChange}
      className="themed-input w-full px-4 py-2 text-sm rounded-full focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-500 dark:focus:border-sky-400 outline-none transition-colors"
      aria-label={t('Search Pokémon', currentLanguage)}
    />
  );
};

export default SearchBar;