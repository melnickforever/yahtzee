'use client';

import { useState, useCallback } from 'react';
import { Language, translations } from '@/app/i18n';

interface DiceGameProps {
  language: Language;
  onExit: () => void;
}

const DICE_SIZE = 52;
const GAP = 10;
const PADDING = 4;
const CORNER_RADIUS = 7;
const MAX_ROLLS = 3;

const pipPositions: Record<number, [number, number][]> = {
  1: [[0.5, 0.5]],
  2: [[0.25, 0.25], [0.75, 0.75]],
  3: [[0.25, 0.25], [0.5, 0.5], [0.75, 0.75]],
  4: [[0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]],
  5: [[0.25, 0.25], [0.75, 0.25], [0.5, 0.5], [0.25, 0.75], [0.75, 0.75]],
  6: [[0.25, 0.25], [0.75, 0.25], [0.25, 0.5], [0.75, 0.5], [0.25, 0.75], [0.75, 0.75]],
};

function randomFace() {
  return Math.floor(Math.random() * 6) + 1;
}

function renderDie(
  face: number,
  x: number,
  y: number,
  body: string,
  border: string,
  pip: string,
) {
  const pipR = DICE_SIZE * 0.08;
  return (
    <>
      <rect
        x={x} y={y} width={DICE_SIZE} height={DICE_SIZE}
        rx={CORNER_RADIUS} ry={CORNER_RADIUS}
        fill={body} stroke={border} strokeWidth={1.5}
      />
      {pipPositions[face].map(([px, py], j) => (
        <circle key={j} cx={x + px * DICE_SIZE} cy={y + py * DICE_SIZE} r={pipR} fill={pip} />
      ))}
    </>
  );
}

export function DiceGame({ language, onExit }: DiceGameProps) {
  const t = translations[language];

  const [gameDice, setGameDice] = useState<number[]>(() => Array.from({ length: 5 }, randomFace));
  const [kept, setKept] = useState<boolean[]>([false, false, false, false, false]);
  const [rollCount, setRollCount] = useState(1);
  const [rolling, setRolling] = useState(false);

  // Initial roll on mount
  const [didInitRoll, setDidInitRoll] = useState(false);
  if (!didInitRoll) {
    setDidInitRoll(true);
    // Trigger initial roll animation
    setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        setGameDice(Array.from({ length: 5 }, randomFace));
        count++;
        if (count >= 8) clearInterval(interval);
      }, 80);
    }, 0);
  }

  const handleRoll = useCallback(() => {
    if (rollCount >= MAX_ROLLS || rolling) return;
    if (kept.every(Boolean)) return;
    setRolling(true);
    setRollCount((c) => c + 1);
    let count = 0;
    const keptSnapshot = [...kept];
    const interval = setInterval(() => {
      setGameDice((prev) => prev.map((val, i) => (keptSnapshot[i] ? val : randomFace())));
      count++;
      if (count >= 8) {
        clearInterval(interval);
        setRolling(false);
      }
    }, 80);
  }, [rollCount, rolling, kept]);

  const toggleKeep = useCallback((index: number) => {
    if (rolling) return;
    setKept((prev) => prev.map((v, i) => (i === index ? !v : v)));
  }, [rolling]);

  const handleNewTurn = useCallback(() => {
    setKept([false, false, false, false, false]);
    setRollCount(1);
    setRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setGameDice(Array.from({ length: 5 }, randomFace));
      count++;
      if (count >= 8) {
        clearInterval(interval);
        setRolling(false);
      }
    }, 80);
  }, []);

  const freeDice = gameDice.map((v, i) => ({ value: v, index: i })).filter((_, i) => !kept[i]);
  const keptDice = gameDice.map((v, i) => ({ value: v, index: i })).filter((_, i) => kept[i]);
  const canRoll = rollCount < MAX_ROLLS && !rolling && freeDice.length > 0;

  const svgW = (count: number) => Math.max(count, 1) * (DICE_SIZE + GAP) - GAP + PADDING * 2;
  const svgH = DICE_SIZE + PADDING * 2;

  return (
    <div className="game-mode" id="dice-game">
      {/* Controls */}
      <div className="game-controls">
        <div className="game-roll-counter">
          {t.game.rollCount} {rollCount} {t.game.of} {MAX_ROLLS}
        </div>
        <div className="game-buttons">
          <button className="game-btn game-btn-roll" onClick={handleRoll} disabled={!canRoll}>
            {canRoll ? t.game.roll : t.game.noRolls}
          </button>
          <button className="game-btn game-btn-new" onClick={handleNewTurn}>
            {t.game.newTurn}
          </button>
          <button className="game-btn game-btn-exit" onClick={onExit}>
            {t.game.exit}
          </button>
        </div>
      </div>

      {/* Free dice area */}
      <div className="game-area game-area-free">
        {freeDice.length > 0 ? (
          <svg width={svgW(freeDice.length)} height={svgH} viewBox={`0 0 ${svgW(freeDice.length)} ${svgH}`}>
            {freeDice.map((d, i) => (
              <g key={d.index} onClick={() => toggleKeep(d.index)} style={{ cursor: 'pointer' }}>
                {renderDie(d.value, PADDING + i * (DICE_SIZE + GAP), PADDING, '#faf3e0', '#8b4513', '#5a2d0c')}
              </g>
            ))}
          </svg>
        ) : (
          <div className="game-area-empty-text">{t.game.noRolls}</div>
        )}
      </div>

      {/* Kept dice area */}
      <div className="game-area game-area-kept">
        <div className="game-area-label">{t.game.kept}</div>
        {keptDice.length > 0 ? (
          <svg width={svgW(keptDice.length)} height={svgH} viewBox={`0 0 ${svgW(keptDice.length)} ${svgH}`}>
            {keptDice.map((d, i) => (
              <g key={d.index} onClick={() => toggleKeep(d.index)} style={{ cursor: 'pointer' }}>
                {renderDie(d.value, PADDING + i * (DICE_SIZE + GAP), PADDING, '#e8dcc6', '#6b3410', '#5a2d0c')}
              </g>
            ))}
          </svg>
        ) : (
          <div className="game-area-empty-text">{t.game.empty}</div>
        )}
      </div>
    </div>
  );
}
