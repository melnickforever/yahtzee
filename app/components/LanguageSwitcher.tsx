'use client';

import { Language } from '@/app/i18n';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div style={{ display: 'flex', gap: '8px', position: 'absolute', top: '16px', right: '16px' }}>
      <button
        onClick={() => onLanguageChange('uk')}
        style={{
          padding: '8px 12px',
          backgroundColor: currentLanguage === 'uk' ? '#007bff' : '#ddd',
          color: currentLanguage === 'uk' ? 'white' : 'black',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: currentLanguage === 'uk' ? 'bold' : 'normal',
        }}
      >
        Укр
      </button>
      <button
        onClick={() => onLanguageChange('en')}
        style={{
          padding: '8px 12px',
          backgroundColor: currentLanguage === 'en' ? '#007bff' : '#ddd',
          color: currentLanguage === 'en' ? 'white' : 'black',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: currentLanguage === 'en' ? 'bold' : 'normal',
        }}
      >
        Eng
      </button>
    </div>
  );
}
