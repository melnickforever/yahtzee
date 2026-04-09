'use client';

import { Language, translations } from '@/app/i18n';
import { useState } from 'react';
import { ScoreCell } from './ScoreCell';

interface ScoreTableProps {
  language: Language;
}

type CategoryKey =
  | 'ones'
  | 'twos'
  | 'threes'
  | 'fours'
  | 'fives'
  | 'sixes'
  | 'threeOfAKind'
  | 'fourOfAKind'
  | 'fullHouse'
  | 'smallStraight'
  | 'largeStraight'
  | 'yahtzee'
  | 'chance';

type ScoresData = Record<CategoryKey, number | null>;

export function ScoreTable({ language }: ScoreTableProps) {
  const t = translations[language];

  const [yahtzeeBonus, setYahtzeeBonus] = useState<number>(0);
  const [yahtzeeBonusEditing, setYahtzeeBonusEditing] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const defaultScores: ScoresData = {
    ones: null,
    twos: null,
    threes: null,
    fours: null,
    fives: null,
    sixes: null,
    threeOfAKind: null,
    fourOfAKind: null,
    fullHouse: null,
    smallStraight: null,
    largeStraight: null,
    yahtzee: null,
    chance: null,
  };

  const [scores, setScores] = useState<ScoresData>(defaultScores);

  const handleScoreChange = (category: CategoryKey, value: number | null) => {
    setScores((prev) => ({ ...prev, [category]: value }));
  };

  const handleClearScores = () => {
    setScores(defaultScores);
    setYahtzeeBonus(0);
    setYahtzeeBonusEditing(false);
    setShowClearConfirm(false);
  };

  const upperCategories: CategoryKey[] = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];
  const lowerCategories: CategoryKey[] = ['threeOfAKind', 'fourOfAKind', 'fullHouse', 'smallStraight', 'largeStraight', 'yahtzee', 'chance'];

  const upperTotal = upperCategories.reduce((sum, cat) => sum + (scores[cat] ?? 0), 0);
  const lowerTotal = lowerCategories.reduce((sum, cat) => sum + (scores[cat] ?? 0), 0);

  const upperBonus = upperTotal >= 63 ? 35 : 0;
  const grandTotal = upperTotal + lowerTotal + upperBonus + yahtzeeBonus;

  const getFixedValue = (categoryKey: CategoryKey): number | null => {
    const fixedValues: Record<string, number> = {
      fullHouse: 25,
      smallStraight: 30,
      largeStraight: 40,
      yahtzee: 50,
    };
    return fixedValues[categoryKey] ?? null;
  };

  const handleSaveGame = () => {
    const clone = document.documentElement.cloneNode(true) as HTMLElement;

    // Collect all CSS and inline it
    const styles: string[] = [];
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(sheet.cssRules)) {
          styles.push(rule.cssText);
        }
      } catch {
        // skip cross-origin sheets
      }
    }
    const styleEl = document.createElement('style');
    styleEl.textContent = styles.join('\n');

    // Remove all existing link[rel=stylesheet] and script tags
    clone.querySelectorAll('link[rel="stylesheet"], script').forEach((el) => el.remove());
    clone.querySelector('head')?.appendChild(styleEl);

    const html = `<!DOCTYPE html>\n${clone.outerHTML}`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = now.toTimeString().slice(0, 8).replace(/:/g, '-');
    a.download = `yahtzee-${date}_${time}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderRow = (categoryKey: CategoryKey, categoryName: string) => {
    const fixedValue = getFixedValue(categoryKey);
    return (
      <div className="score-grid-row">
        <div className="score-grid-cell score-grid-category">{categoryName}</div>
        <div className="score-grid-cell">
          <ScoreCell
            value={scores[categoryKey]}
            onChange={(value) => handleScoreChange(categoryKey, value)}
            fixedValue={fixedValue}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="score-table-container">
      <div className="score-table-header">
        <h2>{t.tableTitle}</h2>
        <button
          className="clear-score-broom"
          onClick={() => setShowClearConfirm((v) => !v)}
          aria-label="clear score"
        >
          🧹
        </button>
      </div>
      <div className={`clear-confirm${showClearConfirm ? ' clear-confirm-visible' : ''}`}>
        <span className="clear-confirm-label">{t.clearScore}</span>
        <button className="game-btn game-btn-roll" onClick={handleClearScores}>{t.yes}</button>
        <button className="rules-button" onClick={() => setShowClearConfirm(false)}>{t.no}</button>
      </div>

      {/* Upper Section */}
      <div className="score-grid-wrapper">
        <div className="score-grid">
          <div className="score-grid-header">
            <div className="score-grid-cell">{t.categories.upper.title}</div>
            <div className="score-grid-cell">{t.score}</div>
          </div>

          {renderRow('ones', t.categories.upper.ones)}
          {renderRow('twos', t.categories.upper.twos)}
          {renderRow('threes', t.categories.upper.threes)}
          {renderRow('fours', t.categories.upper.fours)}
          {renderRow('fives', t.categories.upper.fives)}
          {renderRow('sixes', t.categories.upper.sixes)}

          <div className="score-grid-row score-grid-subtotal">
            <div className="score-grid-cell">{t.categories.upper.subtotal}</div>
            <div className="score-grid-cell score-grid-total">{upperTotal}</div>
          </div>

          <div className="score-grid-row score-grid-bonus">
            <div className="score-grid-cell">{t.bonuses.upperBonus}</div>
            <div className="score-grid-cell">{upperBonus}</div>
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="score-grid-wrapper">
        <div className="score-grid score-grid-lower">
          <div className="score-grid-header">
            <div className="score-grid-cell">{t.categories.lower.title}</div>
            <div className="score-grid-cell">{t.score}</div>
          </div>

          {renderRow('threeOfAKind', t.categories.lower.threeOfAKind)}
          {renderRow('fourOfAKind', t.categories.lower.fourOfAKind)}
          {renderRow('fullHouse', t.categories.lower.fullHouse)}
          {renderRow('smallStraight', t.categories.lower.smallStraight)}
          {renderRow('largeStraight', t.categories.lower.largeStraight)}
          {renderRow('yahtzee', t.categories.lower.yahtzee)}
          {renderRow('chance', t.categories.lower.chance)}

          <div className="score-grid-row score-grid-subtotal">
            <div className="score-grid-cell">{t.categories.lower.subtotal}</div>
            <div className="score-grid-cell score-grid-total">{lowerTotal}</div>
          </div>

          <div className="score-grid-row score-grid-bonus">
            <div className="score-grid-cell">{t.bonuses.yahtzeeBonus}</div>
            <div className="score-grid-cell">
              {yahtzeeBonusEditing ? (
                <select
                  value={yahtzeeBonus}
                  onChange={(e) => {
                    setYahtzeeBonus(Number(e.target.value));
                    setYahtzeeBonusEditing(false);
                  }}
                  onBlur={() => setYahtzeeBonusEditing(false)}
                  autoFocus
                  size={11}
                  className="score-cell-select-open"
                >
                  {Array.from({ length: 11 }, (_, i) => i * 100).map((val) => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
              ) : (
                <div
                  className="score-cell-display"
                  onClick={() => setYahtzeeBonusEditing(true)}
                >
                  {yahtzeeBonus}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grand-total">
        {t.grandTotal}: {grandTotal}
      </div>

      <button className="save-game-button" onClick={handleSaveGame}>
        {t.saveGame}
      </button>
    </div>
  );
}
