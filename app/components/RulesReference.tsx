'use client';

import { Language, translations } from '@/app/i18n';
import { useState } from 'react';

interface RulesReferenceProps {
  language: Language;
}

export function RulesReference({ language }: RulesReferenceProps) {
  const [isVisible, setIsVisible] = useState(false);
  const t = translations[language];

  const rulesData = [
    {
      combination: t.rules_table.ones,
      description: t.rules_table.onesDesc,
      points: t.rules_table.varies,
    },
    {
      combination: t.rules_table.twos,
      description: t.rules_table.twosDesc,
      points: t.rules_table.varies,
    },
    {
      combination: t.rules_table.threes,
      description: t.rules_table.threesDesc,
      points: t.rules_table.varies,
    },
    {
      combination: t.rules_table.fours,
      description: t.rules_table.foursDesc,
      points: t.rules_table.varies,
    },
    {
      combination: t.rules_table.fives,
      description: t.rules_table.fivesDesc,
      points: t.rules_table.varies,
    },
    {
      combination: t.rules_table.sixes,
      description: t.rules_table.sixesDesc,
      points: t.rules_table.varies,
    },
    {
      combination: t.rules_table.threeOfAKind,
      description: t.rules_table.threeOfAKindDesc,
      points: t.rules_table.sumOfAll,
    },
    {
      combination: t.rules_table.fourOfAKind,
      description: t.rules_table.fourOfAKindDesc,
      points: t.rules_table.sumOfAll,
    },
    {
      combination: t.rules_table.fullHouse,
      description: t.rules_table.fullHouseDesc,
      points: t.rules_table.fullHousePoints,
    },
    {
      combination: t.rules_table.smallStraight,
      description: t.rules_table.smallStraightDesc,
      points: t.rules_table.smallStraightPoints,
    },
    {
      combination: t.rules_table.largeStraight,
      description: t.rules_table.largeStraightDesc,
      points: t.rules_table.largeStraightPoints,
    },
    {
      combination: t.rules_table.yahtzee,
      description: t.rules_table.yahtzeeDesc,
      points: t.rules_table.yahtzeePoints,
    },
    {
      combination: t.rules_table.chance,
      description: t.rules_table.chanceDesc,
      points: t.rules_table.sumOfAll,
    },
    {
      combination: t.rules_table.upperBonus,
      description: t.rules_table.upperBonusDesc,
      points: t.rules_table.upperBonusPoints,
      isBonus: true,
    },
    {
      combination: t.rules_table.yahtzeeBonus,
      description: t.rules_table.yatzheeBonusDesc,
      points: t.rules_table.yatzheeBonusPoints,
      isBonus: true,
    },
  ];

  return (
    <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h2 style={{ margin: 0 }}>{t.rules}</h2>
        <button
          onClick={() => setIsVisible(!isVisible)}
          style={{
            padding: '6px 12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {isVisible ? t.hideRules : t.showRules}
        </button>
      </div>

      {isVisible && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#e9ecef', borderBottom: '2px solid #dee2e6' }}>
              <th style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>{t.rules_table.combination}</th>
              <th style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>{t.rules_table.description}</th>
              <th style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>{t.rules_table.points}</th>
            </tr>
          </thead>
          <tbody>
            {rulesData.map((row, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #dee2e6', backgroundColor: row.isBonus ? '#ffe6e6' : (index % 2 === 0 ? '#fff' : '#f9f9f9') }}>
                <td style={{ padding: '8px', fontWeight: row.isBonus ? 'bold' : 'normal' }}>{row.combination}</td>
                <td style={{ padding: '8px' }}>{row.description}</td>
                <td style={{ padding: '8px', fontWeight: row.isBonus ? 'bold' : 'normal' }}>{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
