'use client';

import { useState } from 'react';

interface ScoreCellProps {
  value: number | null;
  onChange: (value: number | null) => void;
  disabled?: boolean;
  fixedValue?: number | null;
}

export function ScoreCell({ value, onChange, disabled, fixedValue }: ScoreCellProps) {
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected === '') {
      onChange(null);
    } else {
      onChange(parseInt(selected, 10));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  if (fixedValue !== null && fixedValue !== undefined) {
    // For fixed value categories, render a dropdown
    if (isEditing) {
      return (
        <select
          value={value ?? ''}
          onChange={(e) => {
            handleSelectChange(e);
            setIsEditing(false);
          }}
          onBlur={() => setIsEditing(false)}
          autoFocus
          size={3}
          className="score-cell-select-open"
        >
          <option value="">—</option>
          <option value="0">0</option>
          <option value={fixedValue}>{fixedValue}</option>
        </select>
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

  // For non-fixed value categories, render a text input
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
