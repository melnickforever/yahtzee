'use client';

import { useState } from 'react';
import { Language, translations } from '@/app/i18n';
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher';
import { RulesReference } from '@/app/components/RulesReference';
import { ScoreTable } from '@/app/components/ScoreTable';

export default function Home() {
  const [language, setLanguage] = useState<Language>('uk');
  const [playerName, setPlayerName] = useState<string>('');
  const t = translations[language];

  return (
    <div style={{ position: 'relative' }}>
      <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '16px' }}>
        <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            {t.playerName}
          </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder={t.playerName}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: '2px solid #007bff',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <RulesReference language={language} />
        <ScoreTable language={language} />
      </main>
    </div>
  );
}
