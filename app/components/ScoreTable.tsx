'use client';

import { Language, translations } from '@/app/i18n';
import { useEffect, useRef, useState } from 'react';
import { ScoreCell } from './ScoreCell';

export type CategoryKey =
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

export type ScoresData = Record<CategoryKey, number | null>;

const ALL_CATEGORY_KEYS: CategoryKey[] = [
  'ones', 'twos', 'threes', 'fours', 'fives', 'sixes',
  'threeOfAKind', 'fourOfAKind', 'fullHouse', 'smallStraight', 'largeStraight', 'yahtzee', 'chance',
];

interface ScoreTableProps {
  language: Language;
  scores: ScoresData;
  onScoreChange: (category: CategoryKey, value: number | null) => void;
  yahtzeeBonus: number;
  onYahtzeeBonusChange: (value: number) => void;
  onClearScores: () => void;
  onLoadGame: (data: { scores: ScoresData; yahtzeeBonus: number; name?: string; language?: Language }) => void;
  playerName: string;
}

export function ScoreTable({ language, scores, onScoreChange, yahtzeeBonus, onYahtzeeBonusChange, onClearScores, onLoadGame, playerName }: ScoreTableProps) {
  const t = translations[language];

  const [yahtzeeBonusEditing, setYahtzeeBonusEditing] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleClearScores = () => {
    onClearScores();
    setYahtzeeBonusEditing(false);
    setShowClearConfirm(false);
  };

  const isYahtzeeBonusLocked = scores.yahtzee === 0;

  useEffect(() => {
    if (isYahtzeeBonusLocked) {
      onYahtzeeBonusChange(0);
      setYahtzeeBonusEditing(false);
    }
  }, [isYahtzeeBonusLocked, onYahtzeeBonusChange]);

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

  const handleSaveGame = async () => {
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = now.toTimeString().slice(0, 8).replace(/:/g, '-');
    const suggestedName = `yahtzee-${date}_${time}.json`;

    const data = JSON.stringify({
      version: 1,
      name: playerName,
      language,
      scores,
      yahtzeeBonus,
      savedAt: now.toISOString(),
    }, null, 2);

    if ('showSaveFilePicker' in window) {
      try {
        const handle = await (window as unknown as { showSaveFilePicker: (opts: { suggestedName: string; types: { description: string; accept: Record<string, string[]> }[] }) => Promise<FileSystemFileHandle> }).showSaveFilePicker({
          suggestedName,
          types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }],
        });
        const writable = await handle.createWritable();
        await writable.write(data);
        await writable.close();
        return;
      } catch (e) {
        if ((e as DOMException).name === 'AbortError') return;
      }
    }

    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = suggestedName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const showFileError = (message: string) => {
    setFileError(message);
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    errorTimerRef.current = setTimeout(() => setFileError(null), 5000);
  };

  const validateGameData = (data: unknown): data is { scores: ScoresData; yahtzeeBonus: number; name?: string; language?: Language } => {
    if (typeof data !== 'object' || data === null) return false;
    const obj = data as Record<string, unknown>;

    // Validate scores
    if (typeof obj.scores !== 'object' || obj.scores === null) return false;
    const s = obj.scores as Record<string, unknown>;
    for (const key of ALL_CATEGORY_KEYS) {
      if (!(key in s)) return false;
      if (s[key] !== null && typeof s[key] !== 'number') return false;
    }

    // Validate yahtzeeBonus
    if (typeof obj.yahtzeeBonus !== 'number') return false;
    if (obj.yahtzeeBonus < 0 || obj.yahtzeeBonus > 1000 || obj.yahtzeeBonus % 100 !== 0) return false;

    // Optional fields
    if ('language' in obj && obj.language !== 'uk' && obj.language !== 'en') return false;
    if ('name' in obj && typeof obj.name !== 'string') return false;

    return true;
  };

  const handleOpenGame = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        if (!validateGameData(data)) {
          showFileError(t.invalidFile);
          return;
        }
        onLoadGame(data);
      } catch {
        showFileError(t.invalidFile);
      }
    };
    reader.readAsText(file);

    // Reset input so the same file can be selected again
    e.target.value = '';
  };

  const renderRow = (categoryKey: CategoryKey, categoryName: string) => {
    const fixedValue = getFixedValue(categoryKey);
    return (
      <div className="score-grid-row">
        <div className="score-grid-cell score-grid-category">{categoryName}</div>
        <div className="score-grid-cell">
          <ScoreCell
            value={scores[categoryKey]}
            onChange={(value) => onScoreChange(categoryKey, value)}
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
              {!isYahtzeeBonusLocked && yahtzeeBonusEditing ? (
                <select
                  value={yahtzeeBonus}
                  onChange={(e) => {
                    onYahtzeeBonusChange(Number(e.target.value));
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
                  className={`score-cell-display${isYahtzeeBonusLocked ? ' score-cell-locked' : ''}`}
                  onClick={isYahtzeeBonusLocked ? undefined : () => setYahtzeeBonusEditing(true)}
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

      <div className="game-actions">
        <button className="open-game-button" onClick={() => fileInputRef.current?.click()}>
          {t.openGame}
        </button>
        <button className="save-game-button" onClick={handleSaveGame}>
          {t.saveGame}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleOpenGame}
          style={{ display: 'none' }}
        />
      </div>
      {fileError && <div className="file-error">{fileError}</div>}
    </div>
  );
}
