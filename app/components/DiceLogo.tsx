'use client';

import { useState, useCallback, useEffect } from 'react';
import { Language, translations } from '@/app/i18n';

interface DiceLogoProps {
  language: Language;
  onEnterGame: () => void;
  gameActive: boolean;
}

const DICE_SIZE = 36;
const GAP = 6;
const PADDING = 4;
const CORNER_RADIUS = 5;

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

export function DiceLogo({ language, onEnterGame, gameActive }: DiceLogoProps) {
  const diceBody = '#faf3e0';
  const diceBorder = '#8b4513';
  const pip = '#5a2d0c';

  const [faces, setFaces] = useState([1, 2, 3, 4, 5]);
  const [rolling, setRolling] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);

  useEffect(() => {
    if (!gameActive) setHasRolled(false);
  }, [gameActive]);

  const handleClick = useCallback(() => {
    if (rolling || gameActive) return;
    setRolling(true);
    setHasRolled(true);
    let count = 0;
    const interval = setInterval(() => {
      setFaces(Array.from({ length: 5 }, randomFace));
      count++;
      if (count >= 8) {
        clearInterval(interval);
        setRolling(false);
        onEnterGame();
      }
    }, 80);
  }, [rolling, gameActive, onEnterGame]);

  const totalWidth = DICE_SIZE * 5 + GAP * 4;
  const svgWidth = totalWidth + PADDING * 2;
  const svgHeight = DICE_SIZE + PADDING * 2;
  const pipRadius = DICE_SIZE * 0.08;

  return (
    <div className="dice-logo-wrapper" onClick={handleClick}>
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        role="img"
        aria-label="Yahtzee dice logo"
        className={!hasRolled && !gameActive ? 'dice-logo-bounce' : ''}
      >
        {faces.map((face, i) => {
          const x = PADDING + i * (DICE_SIZE + GAP);
          const y = PADDING;
          const rotation = (i - 2) * 4;
          const cx = x + DICE_SIZE / 2;
          const cy = y + DICE_SIZE / 2;
          return (
            <g key={i} transform={`rotate(${rotation}, ${cx}, ${cy})`}>
              <rect
                x={x} y={y} width={DICE_SIZE} height={DICE_SIZE}
                rx={CORNER_RADIUS} ry={CORNER_RADIUS}
                fill={diceBody} stroke={diceBorder} strokeWidth={1.5}
              />
              {pipPositions[face].map(([px, py], j) => (
                <circle key={j} cx={x + px * DICE_SIZE} cy={y + py * DICE_SIZE} r={pipRadius} fill={pip} />
              ))}
            </g>
          );
        })}
      </svg>
      {!hasRolled && !gameActive && (
        <div className="dice-logo-hint">
          <span className="dice-logo-hint-arrow">&#8593;</span> {translations[language].tapToRoll}
        </div>
      )}
    </div>
  );
}
