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
        <h1>{t.title}</h1>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="playerNameInput" className="player-label">
                {t.playerName}
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Yahtzee Score Table Generator',
            description: 'Free online tool to generate and calculate Yahtzee score tables with automatic bonus tracking',
            applicationCategory: 'GameApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            inLanguage: language === 'uk' ? 'uk-UA' : 'en-US',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '100',
            },
          }),
        }}
      />
    </div>
  );
}
