'use client';

import { useState } from 'react';

interface ScoreCellProps {
  value: number | null;
  onChange: (value: number | null) => void;
  disabled?: boolean;
}

export function ScoreCell({ value, onChange, disabled }: ScoreCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value?.toString() ?? '');

  const handleClick = () => {
    if (disabled) return;
    setIsEditing(true);
    setTempValue(value?.toString() ?? '');
  };

  const handleSave = () => {
    const parsed = tempValue === '' ? null : parseInt(tempValue, 10);
    if (parsed !== null && isNaN(parsed)) {
      setTempValue(value?.toString() ?? '');
      setIsEditing(false);
      return;
    }
    onChange(parsed);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        type="number"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        autoFocus
        className="score-cell-input"
      />
    );
  }

  return (
    <div
      onClick={handleClick}
      className="score-cell-display"
      style={{
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {value !== null ? value : '—'}
    </div>
  );
}
