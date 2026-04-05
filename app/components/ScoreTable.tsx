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
    setScores((prev) => ({
      ...prev,
      [category]: prev[category].map((score, idx) => (idx === round ? value : score)),
    }));
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
    <div style={{ padding: '16px' }}>
      <h2>{t.title}</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
        <thead>
          <tr style={{ backgroundColor: '#e9ecef', borderBottom: '2px solid #dee2e6' }}>
            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>{t.categories.upper.title}</th>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <th key={i} style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>
                {t.round} {i + 1}
              </th>
            ))}
            <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#fff3cd' }}>{t.total}</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #dee2e6' }}>
            <td style={{ padding: '12px' }}>{t.categories.upper.ones}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i} style={{ padding: '12px', textAlign: 'center' }}>
                <ScoreCell value={scores.ones[i]} onChange={(value) => handleScoreChange('ones', i, value)} />
              </td>
            ))}
            <td style={{ padding: '12px', textAlign: 'center', backgroundColor: '#fff3cd', fontWeight: 'bold' }}>{getCategoryTotal('ones')}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #dee2e6', backgroundColor: '#f9f9f9' }}>
            <td style={{ padding: '12px' }}>{t.categories.upper.twos}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i} style={{ padding: '12px', textAlign: 'center' }}>
                <ScoreCell value={scores.twos[i]} onChange={(value) => handleScoreChange('twos', i, value)} />
              </td>
            ))}
            <td style={{ padding: '12px', textAlign: 'center', backgroundColor: '#fff3cd', fontWeight: 'bold' }}>{getCategoryTotal('twos')}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #dee2e6' }}>
            <td style={{ padding: '12px' }}>{t.categories.upper.threes}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i} style={{ padding: '12px', textAlign: 'center' }}>
                <ScoreCell value={scores.threes[i]} onChange={(value) => handleScoreChange('threes', i, value)} />
              </td>
            ))}
            <td style={{ padding: '12px', textAlign: 'center', backgroundColor: '#fff3cd', fontWeight: 'bold' }}>{getCategoryTotal('threes')}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #dee2e6', backgroundColor: '#f9f9f9' }}>
            <td style={{ padding: '12px' }}>{t.categories.upper.fours}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i} style={{ padding: '12px', textAlign: 'center' }}>
                <ScoreCell value={scores.fours[i]} onChange={(value) => handleScoreChange('fours', i, value)} />
              </td>
            ))}
            <td style={{ padding: '12px', textAlign: 'center', backgroundColor: '#fff3cd', fontWeight: 'bold' }}>{getCategoryTotal('fours')}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #dee2e6' }}>
            <td style={{ padding: '12px' }}>{t.categories.upper.fives}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i} style={{ padding: '12px', textAlign: 'center' }}>
                <ScoreCell value={scores.fives[i]} onChange={(value) => handleScoreChange('fives', i, value)} />
              </td>
            ))}
            <td style={{ padding: '12px', textAlign: 'center', backgroundColor: '#fff3cd', fontWeight: 'bold' }}>{getCategoryTotal('fives')}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #dee2e6', backgroundColor: '#f9f9f9' }}>
            <td style={{ padding: '12px' }}>{t.categories.upper.sixes}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i} style={{ padding: '12px', textAlign: 'center' }}>
                <ScoreCell value={scores.sixes[i]} onChange={(value) => handleScoreChange('sixes', i, value)} />
              </td>
            ))}
            <td style={{ padding: '12px', textAlign: 'center', backgroundColor: '#fff3cd', fontWeight: 'bold' }}>{getCategoryTotal('sixes')}</td>
          </tr>
          <tr style={{ borderBottom: '2px solid #dee2e6', backgroundColor: '#e9ecef', fontWeight: 'bold' }}>
            <td style={{ padding: '12px' }}>{t.categories.upper.subtotal}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i} style={{ padding: '12px', textAlign: 'center' }}>
                {getRoundTotal(i, 'upper')}
              </td>
            ))}
            <td style={{ padding: '12px', textAlign: 'center', backgroundColor: '#fff3cd' }}>{upperGrandTotal}</td>
          </tr>
          <tr style={{ borderBottom: '2px solid #dee2e6', backgroundColor: '#ffe6e6' }}>
            <td style={{ padding: '12px' }}>{t.bonuses.upperBonus}</td>
            {Array.from({ length: ROUNDS }, () => (
              <td key="bonus" style={{ padding: '12px', textAlign: 'center' }}>—</td>
            ))}
            <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>{upperBonus}</td>
          </tr>
        </tbody>
      </table>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '32px' }}>
        <thead>
          <tr style={{ backgroundColor: '#e9ecef', borderBottom: '2px solid #dee2e6' }}>
            <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>{t.categories.lower.title}</th>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <th key={i} style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>
                {t.round} {i + 1}
              </th>
            ))}
            <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#fff3cd' }}>{t.total}</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #dee2e6' }}>
            <td style={{ padding: '12px' }}>{t.categories.lower.threeOfAKind}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i} style={{ padding: '12px', textAlign: 'center' }}>
                <ScoreCell value={scores.threeOfAKind[i]} onChange={(value) => handleScoreChange('threeOfAKind', i, value)} />
              </td>
            ))}
            <td style={{ padding: '12px', textAlign: 'center', backgroundColor: '#fff3cd', fontWeight: 'bold' }}>{getCategoryTotal('threeOfAKind')}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #dee2e6', backgroundColor: '#f9f9f9' }}>
            <td style={{ padding: '12px' }}>{t.categories.lower.fourOfAKind}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i} style={{ padding: '12px', textAlign: 'center' }}>
                <ScoreCell value={scores.fourOfAKind[i]} onChange={(value) => handleScoreChange('fourOfAKind', i, value)} />
              </td>
            ))}
            <td style={{ padding: '12px', textAlign: 'center', backgroundColor: '#fff3cd', fontWeight: 'bold' }}>{getCategoryTotal('fourOfAKind')}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #dee2e6' }}>
            <td style={{ padding: '12px' }}>{t.categories.lower.fullHouse}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i} style={{ padding: '12px', textAlign: 'center' }}>
                <ScoreCell value={scores.fullHouse[i]} onChange={(value) => handleScoreChange('fullHouse', i, value)} />
              </td>
            ))}
            <td style={{ padding: '12px', textAlign: 'center', backgroundColor: '#fff3cd', fontWeight: 'bold' }}>{getCategoryTotal('fullHouse')}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #dee2e6', backgroundColor: '#f9f9f9' }}>
            <td style={{ padding: '12px' }}>{t.categories.lower.smallStraight}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i} style={{ padding: '12px', textAlign: 'center' }}>
                <ScoreCell value={scores.smallStraight[i]} onChange={(value) => handleScoreChange('smallStraight', i, value)} />
              </td>
            ))}
            <td style={{ padding: '12px', textAlign: 'center', backgroundColor: '#fff3cd', fontWeight: 'bold' }}>{getCategoryTotal('smallStraight')}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #dee2e6' }}>
            <td style={{ padding: '12px' }}>{t.categories.lower.largeStraight}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i} style={{ padding: '12px', textAlign: 'center' }}>
                <ScoreCell value={scores.largeStraight[i]} onChange={(value) => handleScoreChange('largeStraight', i, value)} />
              </td>
            ))}
            <td style={{ padding: '12px', textAlign: 'center', backgroundColor: '#fff3cd', fontWeight: 'bold' }}>{getCategoryTotal('largeStraight')}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #dee2e6', backgroundColor: '#f9f9f9' }}>
            <td style={{ padding: '12px' }}>{t.categories.lower.yahtzee}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i} style={{ padding: '12px', textAlign: 'center' }}>
                <ScoreCell value={scores.yahtzee[i]} onChange={(value) => handleScoreChange('yahtzee', i, value)} />
              </td>
            ))}
            <td style={{ padding: '12px', textAlign: 'center', backgroundColor: '#fff3cd', fontWeight: 'bold' }}>{getCategoryTotal('yahtzee')}</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #dee2e6' }}>
            <td style={{ padding: '12px' }}>{t.categories.lower.chance}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i} style={{ padding: '12px', textAlign: 'center' }}>
                <ScoreCell value={scores.chance[i]} onChange={(value) => handleScoreChange('chance', i, value)} />
              </td>
            ))}
            <td style={{ padding: '12px', textAlign: 'center', backgroundColor: '#fff3cd', fontWeight: 'bold' }}>{getCategoryTotal('chance')}</td>
          </tr>
          <tr style={{ borderBottom: '2px solid #dee2e6', backgroundColor: '#e9ecef', fontWeight: 'bold' }}>
            <td style={{ padding: '12px' }}>{t.categories.lower.subtotal}</td>
            {Array.from({ length: ROUNDS }, (_, i) => (
              <td key={i} style={{ padding: '12px', textAlign: 'center' }}>
                {getRoundTotal(i, 'lower')}
              </td>
            ))}
            <td style={{ padding: '12px', textAlign: 'center', backgroundColor: '#fff3cd' }}>{lowerGrandTotal}</td>
          </tr>
          <tr style={{ borderBottom: '2px solid #dee2e6', backgroundColor: '#ffe6e6' }}>
            <td style={{ padding: '12px' }}>{t.bonuses.yahtzeeBonus}</td>
            {Array.from({ length: ROUNDS }, () => (
              <td key="bonus" style={{ padding: '12px', textAlign: 'center' }}>—</td>
            ))}
            <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>{yahtzeeBonus}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: '32px', padding: '16px', backgroundColor: '#d4edda', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>
        {t.grandTotal}: {grandTotal}
      </div>
    </div>
  );
}
