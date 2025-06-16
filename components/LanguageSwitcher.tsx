
import React, { useState, useEffect, useRef } from 'react';
import { SupportedLanguage } from '../types';
import { t } from '../translations';

interface LanguageSwitcherProps {
  currentLanguage: SupportedLanguage;
  onChangeLanguage: (language: SupportedLanguage) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLanguage, onChangeLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const languages: { code: SupportedLanguage; label: string; flag: string, short: string }[] = [
    { code: 'pt-BR', label: 'Português (Brasil)', flag: '🇧🇷', short: 'BR' },
    { code: 'en', label: 'English', flag: '🇺🇸', short: 'EN' },
  ];

  const currentLangDisplay = languages.find(lang => lang.code === currentLanguage)?.short || 'EN';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const handleLanguageSelect = (langCode: SupportedLanguage) => {
    onChangeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="themed-control-button flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:ring-offset-2 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={t('Change language', currentLanguage)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="themed-control-button-icon h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.002 6.002 0 0111.336 0H4.332zm1.074 4.01a6.003 6.003 0 018.52 0H5.406zM10 3a7 7 0 00-4.045 12.437A6.995 6.995 0 0010 17a6.995 6.995 0 004.045-1.563A7 7 0 0010 3z" clipRule="evenodd" />
        </svg>
        <span>{currentLangDisplay}</span>
         <svg xmlns="http://www.w3.org/2000/svg" className="themed-select-arrow h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div
          className="themed-dropdown-menu absolute top-full right-0 mt-2 w-48 backdrop-blur-sm rounded-md shadow-xl py-1 z-30 ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className="themed-dropdown-item-hover-bg flex items-center space-x-3 w-full text-left px-4 py-2 text-sm themed-dropdown-item-text transition-colors"
              role="menuitem"
              disabled={currentLanguage === lang.code}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
              {currentLanguage === lang.code && (
                <svg xmlns="http://www.w3.org/2000/svg" className="themed-dropdown-item-current-icon h-4 w-4 ml-auto" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;