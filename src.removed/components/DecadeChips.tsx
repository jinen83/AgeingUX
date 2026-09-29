import React from 'react';
import { cx } from '../utils/a11y';

export type DecadeChipsProps = {
  minYear: number;
  maxYear: number;
  value: number | null; // decade start (e.g., 1990) or null
  onChange: (start: number | null) => void;
  className?: string;
};

function decadesInRange(minYear: number, maxYear: number) {
  const start = Math.floor(minYear / 10) * 10;
  const end = Math.floor(maxYear / 10) * 10;
  const out: number[] = [];
  for (let d = start; d <= end; d += 10) out.push(d);
  return out;
}

export function DecadeChips({ minYear, maxYear, value, onChange, className }: DecadeChipsProps) {
  const decades = React.useMemo(() => decadesInRange(minYear, maxYear), [minYear, maxYear]);
  return (
    <div className={cx('chips', className)} role='group' aria-label='Filter by decade'>
      {decades.map((d) => {
        const selected = value === d;
        return (
          <button
            key={d}
            type='button'
            className={cx('chip', selected && 'chip-selected')}
            aria-pressed={selected}
            onClick={() => onChange(selected ? null : d)}
          >
            {d}s
          </button>
        );
      })}
    </div>
  );
}

export default DecadeChips;

