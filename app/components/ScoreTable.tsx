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

  const isRoundFilled = (round: number, currentCategory?: CategoryKey) => {
    return Object.entries(scores).some(
      ([cat, roundScores]) => (currentCategory ? cat !== currentCategory : true) && roundScores[round] !== null
    );
  };

  const getCategoryTotal = (category: CategoryKey) => {
    return scores[category].reduce((sum, score) => sum + (score ?? 0), 0);
  };

  const getRoundTotal = (round: number, section: 'upper' | 'lower') => {
    const categories = section === 'upper' ? ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'] : ['threeOfAKind', 'fourOfAKind', 'fullHouse', 'smallStraight', 'largeStraight', 'yahtzee', 'chance'];
    return categories.reduce((sum, cat) => sum + (scores[cat as CategoryKey][round] ?? 0), 0);
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

  return (
    <div className="score-table-container">
      <h2>{t.title}</h2>

      <table className="score-table">
        <thead>
          <tr className="score-table-header">
            <th>{t.categories.upper.title}</th>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <th key={i}>
                {t.round} {i + 1}
              </th>
            ))}
            <th className="score-table-header-total">{t.total}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="score-category-name">{t.categories.upper.ones}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i}>
                <ScoreCell
                  value={scores.ones[i]}
                  onChange={(value) => handleScoreChange('ones', i, value)}
                  disabled={isRoundFilled(i, 'ones')}
                />
              </td>
            ))}
            <td className="score-category-total">{getCategoryTotal('ones')}</td>
          </tr>
          <tr>
            <td className="score-category-name">{t.categories.upper.twos}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i}>
                <ScoreCell
                  value={scores.twos[i]}
                  onChange={(value) => handleScoreChange('twos', i, value)}
                  disabled={isRoundFilled(i, 'twos')}
                />
              </td>
            ))}
            <td className="score-category-total">{getCategoryTotal('twos')}</td>
          </tr>
          <tr>
            <td className="score-category-name">{t.categories.upper.threes}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i}>
                <ScoreCell
                  value={scores.threes[i]}
                  onChange={(value) => handleScoreChange('threes', i, value)}
                  disabled={isRoundFilled(i, 'threes')}
                />
              </td>
            ))}
            <td className="score-category-total">{getCategoryTotal('threes')}</td>
          </tr>
          <tr>
            <td className="score-category-name">{t.categories.upper.fours}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i}>
                <ScoreCell
                  value={scores.fours[i]}
                  onChange={(value) => handleScoreChange('fours', i, value)}
                  disabled={isRoundFilled(i, 'fours')}
                />
              </td>
            ))}
            <td className="score-category-total">{getCategoryTotal('fours')}</td>
          </tr>
          <tr>
            <td className="score-category-name">{t.categories.upper.fives}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i}>
                <ScoreCell
                  value={scores.fives[i]}
                  onChange={(value) => handleScoreChange('fives', i, value)}
                  disabled={isRoundFilled(i, 'fives')}
                />
              </td>
            ))}
            <td className="score-category-total">{getCategoryTotal('fives')}</td>
          </tr>
          <tr>
            <td className="score-category-name">{t.categories.upper.sixes}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i}>
                <ScoreCell
                  value={scores.sixes[i]}
                  onChange={(value) => handleScoreChange('sixes', i, value)}
                  disabled={isRoundFilled(i, 'sixes')}
                />
              </td>
            ))}
            <td className="score-category-total">{getCategoryTotal('sixes')}</td>
          </tr>
          <tr className="score-subtotal-row">
            <td className="score-category-name">{t.categories.upper.subtotal}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i}>
                {getRoundTotal(i, 'upper')}
              </td>
            ))}
            <td>{upperGrandTotal}</td>
          </tr>
          <tr className="score-bonus-row">
            <td className="score-category-name">{t.bonuses.upperBonus}</td>
            {Array.from({ length: ROUNDS }, () => (
              <td key="bonus">—</td>
            ))}
            <td className="score-bonus-value">{upperBonus}</td>
          </tr>
        </tbody>
      </table>

      <table className="score-table">
        <thead>
          <tr className="score-table-header">
            <th>{t.categories.lower.title}</th>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <th key={i}>
                {t.round} {i + 1}
              </th>
            ))}
            <th className="score-table-header-total">{t.total}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="score-category-name">{t.categories.lower.threeOfAKind}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i}>
                <ScoreCell
                  value={scores.threeOfAKind[i]}
                  onChange={(value) => handleScoreChange('threeOfAKind', i, value)}
                  disabled={isRoundFilled(i, 'threeOfAKind')}
                />
              </td>
            ))}
            <td className="score-category-total">{getCategoryTotal('threeOfAKind')}</td>
          </tr>
          <tr>
            <td className="score-category-name">{t.categories.lower.fourOfAKind}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i}>
                <ScoreCell
                  value={scores.fourOfAKind[i]}
                  onChange={(value) => handleScoreChange('fourOfAKind', i, value)}
                  disabled={isRoundFilled(i, 'fourOfAKind')}
                />
              </td>
            ))}
            <td className="score-category-total">{getCategoryTotal('fourOfAKind')}</td>
          </tr>
          <tr>
            <td className="score-category-name">{t.categories.lower.fullHouse}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i}>
                <ScoreCell
                  value={scores.fullHouse[i]}
                  onChange={(value) => handleScoreChange('fullHouse', i, value)}
                  disabled={isRoundFilled(i, 'fullHouse')}
                />
              </td>
            ))}
            <td className="score-category-total">{getCategoryTotal('fullHouse')}</td>
          </tr>
          <tr>
            <td className="score-category-name">{t.categories.lower.smallStraight}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i}>
                <ScoreCell
                  value={scores.smallStraight[i]}
                  onChange={(value) => handleScoreChange('smallStraight', i, value)}
                  disabled={isRoundFilled(i, 'smallStraight')}
                />
              </td>
            ))}
            <td className="score-category-total">{getCategoryTotal('smallStraight')}</td>
          </tr>
          <tr>
            <td className="score-category-name">{t.categories.lower.largeStraight}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i}>
                <ScoreCell
                  value={scores.largeStraight[i]}
                  onChange={(value) => handleScoreChange('largeStraight', i, value)}
                  disabled={isRoundFilled(i, 'largeStraight')}
                />
              </td>
            ))}
            <td className="score-category-total">{getCategoryTotal('largeStraight')}</td>
          </tr>
          <tr>
            <td className="score-category-name">{t.categories.lower.yahtzee}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i}>
                <ScoreCell
                  value={scores.yahtzee[i]}
                  onChange={(value) => handleScoreChange('yahtzee', i, value)}
                  disabled={isRoundFilled(i, 'yahtzee')}
                />
              </td>
            ))}
            <td className="score-category-total">{getCategoryTotal('yahtzee')}</td>
          </tr>
          <tr>
            <td className="score-category-name">{t.categories.lower.chance}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i}>
                <ScoreCell
                  value={scores.chance[i]}
                  onChange={(value) => handleScoreChange('chance', i, value)}
                  disabled={isRoundFilled(i, 'chance')}
                />
              </td>
            ))}
            <td className="score-category-total">{getCategoryTotal('chance')}</td>
          </tr>
          <tr className="score-subtotal-row">
            <td className="score-category-name">{t.categories.lower.subtotal}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i}>
                {getRoundTotal(i, 'lower')}
              </td>
            ))}
            <td>{lowerGrandTotal}</td>
          </tr>
          <tr className="score-bonus-row">
            <td className="score-category-name">{t.bonuses.yahtzeeBonus}</td>
            {Array.from({ length: ROUNDS }, () => (
              <td key="bonus">—</td>
            ))}
            <td className="score-bonus-value">{yahtzeeBonus}</td>
          </tr>
        </tbody>
      </table>

      <div className="grand-total">
        {t.grandTotal}: {grandTotal}
      </div>
    </div>
  );
}
