'use client';

import { useState } from 'react';

interface ScoreCellProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

export function ScoreCell({ value, onChange }: ScoreCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value?.toString() ?? '');

  const handleClick = () => {
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
        style={{
          width: '100%',
          padding: '4px',
          border: '2px solid #007bff',
          borderRadius: '4px',
          fontSize: '14px',
          textAlign: 'center',
        }}
      />
    );
  }

  return (
    <div
      onClick={handleClick}
      style={{
        padding: '8px',
        backgroundColor: '#f0f0f0',
        borderRadius: '4px',
        cursor: 'pointer',
        textAlign: 'center',
        minHeight: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {value !== null ? value : '—'}
    </div>
  );
}
