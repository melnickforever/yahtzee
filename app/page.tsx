'use client';

import { useState, useCallback } from 'react';
import { Language, translations } from '@/app/i18n';
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher';
import { DiceLogo } from '@/app/components/DiceLogo';
import { DiceGame } from '@/app/components/DiceGame';
import { RulesReference } from '@/app/components/RulesReference';
import { ScoreTable } from '@/app/components/ScoreTable';

export default function Home() {
  const [language, setLanguage] = useState<Language>('uk');
  const [playerName, setPlayerName] = useState('');
  const [isPlayerNameSaved, setIsPlayerNameSaved] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const t = translations[language];

  const smoothScroll = useCallback((targetY: number, duration = 1200) => {
    const startY = window.scrollY;
    const diff = targetY - startY;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      window.scrollTo(0, startY + diff * ease);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  const handleEnterGame = useCallback(() => {
    setGameActive(true);
    setTimeout(() => {
      const el = document.getElementById('dice-game');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 20;
        smoothScroll(top, 1200);
      }
    }, 100);
  }, [smoothScroll]);

  return (
    <div className="page-container">
      <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="main-container">
        <div style={{ textAlign: 'center' }}><DiceLogo language={language} onEnterGame={handleEnterGame} gameActive={gameActive} /></div>
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
                  onClick={() => { if (playerName.trim()) setIsPlayerNameSaved(true); }}
                  disabled={!playerName.trim()}
                  className="player-save-button"
                >
                  {t.playerNameSave}
                </button>
              </div>
            </div>
          )}
        </div>
        {gameActive && <DiceGame language={language} onExit={() => {
          setGameActive(false);
          smoothScroll(0, 1200);
        }} />}
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
