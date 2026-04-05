'use client';

import { useState } from 'react';
import { Language, translations } from '@/app/i18n';
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher';
import { RulesReference } from '@/app/components/RulesReference';
import { ScoreTable } from '@/app/components/ScoreTable';

export default function Home() {
  const [language, setLanguage] = useState<Language>('uk');
  const [playerName, setPlayerName] = useState<string>('');
  const [isPlayerNameSaved, setIsPlayerNameSaved] = useState<boolean>(false);
  const t = translations[language];

  const handleSavePlayerName = () => {
    if (playerName.trim()) {
      setIsPlayerNameSaved(true);
    }
  };

  return (
    <div className="page-container">
      <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="main-container">
        <div className="player-section">
          {isPlayerNameSaved ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="player-name-display">{playerName}</div>
              <button
                onClick={() => setIsPlayerNameSaved(false)}
                className="player-edit-button"
              >
                ✎
              </button>
            </div>
          ) : (
            <div>
              <label htmlFor="playerNameInput" className="player-label">
                {t.playerName}
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input
                  id="playerNameInput"
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder={t.playerName}
                  className="player-input"
                />
                <button
                  onClick={handleSavePlayerName}
                  disabled={!playerName.trim()}
                  className="player-save-button"
                >
                  {t.playerNameSave}
                </button>
              </div>
            </div>
          )}
        </div>
        <RulesReference language={language} />
        <ScoreTable language={language} />
      </main>
    </div>
  );
}
