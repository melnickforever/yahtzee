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
    <div className="page-container">
      <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="main-container">
        <div className="player-section">
          <label className="player-label">
            {t.playerName}
          </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder={t.playerName}
            className="player-input"
          />
        </div>
        <RulesReference language={language} />
        <ScoreTable language={language} />
      </main>
    </div>
  );
}
