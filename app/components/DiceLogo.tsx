'use client';

import { useState, useCallback } from 'react';

export function DiceLogo() {
  const diceSize = 36;
  const gap = 6;
  const totalWidth = diceSize * 5 + gap * 4;
  const padding = 4;
  const svgWidth = totalWidth + padding * 2;
  const svgHeight = diceSize + padding * 2;

  const diceBody = '#faf3e0';
  const diceBorder = '#8b4513';
  const pip = '#5a2d0c';

  const pipPositions: Record<number, [number, number][]> = {
    1: [[0.5, 0.5]],
    2: [[0.25, 0.25], [0.75, 0.75]],
    3: [[0.25, 0.25], [0.5, 0.5], [0.75, 0.75]],
    4: [[0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]],
    5: [[0.25, 0.25], [0.75, 0.25], [0.5, 0.5], [0.25, 0.75], [0.75, 0.75]],
    6: [[0.25, 0.25], [0.75, 0.25], [0.25, 0.5], [0.75, 0.5], [0.25, 0.75], [0.75, 0.75]],
  };

  const defaultFaces = [1, 2, 3, 4, 5];
  const [faces, setFaces] = useState(defaultFaces);
  const [rolling, setRolling] = useState(false);

  const rollDice = useCallback(() => {
    if (rolling) return;
    setRolling(true);

    let count = 0;
    const totalFrames = 8;
    const interval = setInterval(() => {
      setFaces(Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1));
      count++;
      if (count >= totalFrames) {
        clearInterval(interval);
        setRolling(false);
      }
    }, 80);
  }, [rolling]);

  const pipRadius = diceSize * 0.08;
  const cornerRadius = 5;

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      role="img"
      aria-label="Yahtzee dice logo — click to roll"
      onClick={rollDice}
      style={{ cursor: 'pointer' }}
    >
      {faces.map((face, i) => {
        const x = padding + i * (diceSize + gap);
        const y = padding;
        const baseRotation = (i - 2) * 4;
        const cx = x + diceSize / 2;
        const cy = y + diceSize / 2;

        return (
          <g key={i} transform={`rotate(${baseRotation}, ${cx}, ${cy})`}>
            <rect
              x={x}
              y={y}
              width={diceSize}
              height={diceSize}
              rx={cornerRadius}
              ry={cornerRadius}
              fill={diceBody}
              stroke={diceBorder}
              strokeWidth={1.5}
            >
              {rolling && (
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values={`0 0; ${(i % 2 ? 2 : -2)} ${-3}; 0 0`}
                  dur="0.16s"
                  repeatCount="indefinite"
                />
              )}
            </rect>
            {pipPositions[face].map(([px, py], j) => (
              <circle
                key={j}
                cx={x + px * diceSize}
                cy={y + py * diceSize}
                r={pipRadius}
                fill={pip}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}
