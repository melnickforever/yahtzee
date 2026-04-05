'use client';

import { Language } from '@/app/i18n';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div className="language-switcher">
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="language-select"
      >
        <option value="uk">Укр</option>
        <option value="en">Eng</option>
      </select>
    </div>
  );
}
