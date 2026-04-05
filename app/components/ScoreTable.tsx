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

const ROUNDS = 6;

type ScoresData = Record<CategoryKey, (number | null)[]>;

export function ScoreTable({ language }: ScoreTableProps) {
  const t = translations[language];

  const [scores, setScores] = useState<ScoresData>({
    ones: Array(ROUNDS).fill(null),
    twos: Array(ROUNDS).fill(null),
    threes: Array(ROUNDS).fill(null),
    fours: Array(ROUNDS).fill(null),
    fives: Array(ROUNDS).fill(null),
    sixes: Array(ROUNDS).fill(null),
    threeOfAKind: Array(ROUNDS).fill(null),
    fourOfAKind: Array(ROUNDS).fill(null),
    fullHouse: Array(ROUNDS).fill(null),
    smallStraight: Array(ROUNDS).fill(null),
    largeStraight: Array(ROUNDS).fill(null),
    yahtzee: Array(ROUNDS).fill(null),
    chance: Array(ROUNDS).fill(null),
  });

  const handleScoreChange = (category: CategoryKey, round: number, value: number | null) => {
    // Check if another cell in this round is already filled
    if (value !== null) {
      const roundHasFilled = Object.entries(scores).some(
        ([cat, roundScores]) => cat !== category && roundScores[round] !== null
      );
      if (roundHasFilled) {
        alert(t.oneCellPerRound || 'Only one cell per round allowed');
        return;
      }
    }

    setScores((prev) => ({
      ...prev,
      [category]: prev[category].map((score, idx) => (idx === round ? value : score)),
    }));
  };

  const getCategoryTotal = (category: CategoryKey) => {
    return scores[category].reduce((sum: number, score) => sum + (score ?? 0), 0);
  };

  const getRoundTotal = (round: number, section: 'upper' | 'lower') => {
    const categories = section === 'upper' ? ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'] : ['threeOfAKind', 'fourOfAKind', 'fullHouse', 'smallStraight', 'largeStraight', 'yahtzee', 'chance'];
    return categories.reduce((sum, cat) => sum + (scores[cat as CategoryKey][round] ?? 0), 0);
  };

  const isRoundFilled = (round: number, currentCategory?: CategoryKey) => {
    return Object.entries(scores).some(
      ([cat, roundScores]) => (currentCategory ? cat !== currentCategory : true) && roundScores[round] !== null
    );
  };

  // Calculate totals across all rounds
  const upperCategories = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'] as CategoryKey[];
  const lowerCategories = ['threeOfAKind', 'fourOfAKind', 'fullHouse', 'smallStraight', 'largeStraight', 'yahtzee', 'chance'] as CategoryKey[];

  const upperTotals = upperCategories.map((cat) => getCategoryTotal(cat));
  const lowerTotals = lowerCategories.map((cat) => getCategoryTotal(cat));

  const upperGrandTotal = upperTotals.reduce((sum, total) => sum + total, 0);
  const lowerGrandTotal = lowerTotals.reduce((sum, total) => sum + total, 0);

  // Upper bonus (if total >= 63)
  const upperBonus = upperGrandTotal >= 63 ? 35 : 0;

  // Yahtzee bonus (100 points for each Yahtzee after the first)
  const yahtzeeTotal = getCategoryTotal('yahtzee');
  const yahtzeeBonus = yahtzeeTotal >= 50 ? Math.max(0, Math.floor((yahtzeeTotal - 50) / 50)) * 100 : 0;

  // Grand total
  const grandTotal = upperGrandTotal + lowerGrandTotal + upperBonus + yahtzeeBonus;

  const renderGridRow = (categoryKey: CategoryKey, categoryName: string) => (
    <>
      <div className="score-grid-cell score-grid-category">{categoryName}</div>
      {Array.from({ length: ROUNDS }, (_, i) => (
        <div key={i} className="score-grid-cell">
          <ScoreCell
            value={scores[categoryKey][i]}
            onChange={(value) => handleScoreChange(categoryKey, i, value)}
            disabled={isRoundFilled(i, categoryKey)}
          />
        </div>
      ))}
      <div className="score-grid-cell score-grid-total">{getCategoryTotal(categoryKey)}</div>
    </>
  );

  return (
    <div className="score-table-container">
      <h2>{t.title}</h2>

      {/* Upper Section */}
      <div className="score-grid">
        <div className="score-grid-header">
          <div className="score-grid-cell">{t.categories.upper.title}</div>
          {Array.from({ length: ROUNDS }, (_, i) => (
            <div key={i} className="score-grid-cell">
              {t.round} {i + 1}
            </div>
          ))}
          <div className="score-grid-cell score-grid-header-total">{t.total}</div>
        </div>

        <div className="score-grid-row">{renderGridRow('ones', t.categories.upper.ones)}</div>
        <div className="score-grid-row">{renderGridRow('twos', t.categories.upper.twos)}</div>
        <div className="score-grid-row">{renderGridRow('threes', t.categories.upper.threes)}</div>
        <div className="score-grid-row">{renderGridRow('fours', t.categories.upper.fours)}</div>
        <div className="score-grid-row">{renderGridRow('fives', t.categories.upper.fives)}</div>
        <div className="score-grid-row">{renderGridRow('sixes', t.categories.upper.sixes)}</div>

        <div className="score-grid-row score-grid-subtotal">
          <div className="score-grid-cell">{t.categories.upper.subtotal}</div>
          {Array.from({ length: ROUNDS }, (_, i) => (
            <div key={i} className="score-grid-cell">
              {getRoundTotal(i, 'upper')}
            </div>
          ))}
          <div className="score-grid-cell score-grid-total">{upperGrandTotal}</div>
        </div>

        <div className="score-grid-row score-grid-bonus">
          <div className="score-grid-cell">{t.bonuses.upperBonus}</div>
          {Array.from({ length: ROUNDS }, () => (
            <div key="bonus" className="score-grid-cell">
              —
            </div>
          ))}
          <div className="score-grid-cell">{upperBonus}</div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="score-grid score-grid-lower">
        <div className="score-grid-header">
          <div className="score-grid-cell">{t.categories.lower.title}</div>
          {Array.from({ length: ROUNDS }, (_, i) => (
            <div key={i} className="score-grid-cell">
              {t.round} {i + 1}
            </div>
          ))}
          <div className="score-grid-cell score-grid-header-total">{t.total}</div>
        </div>

        <div className="score-grid-row">{renderGridRow('threeOfAKind', t.categories.lower.threeOfAKind)}</div>
        <div className="score-grid-row">{renderGridRow('fourOfAKind', t.categories.lower.fourOfAKind)}</div>
        <div className="score-grid-row">{renderGridRow('fullHouse', t.categories.lower.fullHouse)}</div>
        <div className="score-grid-row">{renderGridRow('smallStraight', t.categories.lower.smallStraight)}</div>
        <div className="score-grid-row">{renderGridRow('largeStraight', t.categories.lower.largeStraight)}</div>
        <div className="score-grid-row">{renderGridRow('yahtzee', t.categories.lower.yahtzee)}</div>
        <div className="score-grid-row">{renderGridRow('chance', t.categories.lower.chance)}</div>

        <div className="score-grid-row score-grid-subtotal">
          <div className="score-grid-cell">{t.categories.lower.subtotal}</div>
          {Array.from({ length: ROUNDS }, (_, i) => (
            <div key={i} className="score-grid-cell">
              {getRoundTotal(i, 'lower')}
            </div>
          ))}
          <div className="score-grid-cell score-grid-total">{lowerGrandTotal}</div>
        </div>

        <div className="score-grid-row score-grid-bonus">
          <div className="score-grid-cell">{t.bonuses.yahtzeeBonus}</div>
          {Array.from({ length: ROUNDS }, () => (
            <div key="bonus" className="score-grid-cell">
              —
            </div>
          ))}
          <div className="score-grid-cell">{yahtzeeBonus}</div>
        </div>
      </div>

      <div className="grand-total">
        {t.grandTotal}: {grandTotal}
      </div>
    </div>
  );
}
