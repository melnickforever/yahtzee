'use client';

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

  // Pip positions for each face (centered in a diceSize x diceSize die)
  const pipPositions: Record<number, [number, number][]> = {
    1: [[0.5, 0.5]],
    2: [[0.25, 0.25], [0.75, 0.75]],
    3: [[0.25, 0.25], [0.5, 0.5], [0.75, 0.75]],
    4: [[0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]],
    5: [[0.25, 0.25], [0.75, 0.25], [0.5, 0.5], [0.25, 0.75], [0.75, 0.75]],
  };

  const faces = [1, 2, 3, 4, 5];
  const pipRadius = diceSize * 0.08;
  const cornerRadius = 5;

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      role="img"
      aria-label="Yahtzee dice logo"
    >
      {faces.map((face, i) => {
        const x = padding + i * (diceSize + gap);
        const y = padding;
        const rotation = (i - 2) * 4; // slight tilt: -8, -4, 0, 4, 8
        const cx = x + diceSize / 2;
        const cy = y + diceSize / 2;

        return (
          <g key={i} transform={`rotate(${rotation}, ${cx}, ${cy})`}>
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
            />
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
