import React from 'react';
import { cx } from '../utils/a11y';

export type OptionProps = {
  id: string;
  label: string;
  active?: boolean;
  selected?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
};

export function Option({ id, label, active, selected, onClick, onMouseEnter }: OptionProps) {
  return (
    <li
      id={id}
      role="option"
      aria-selected={!!selected}
      className={cx(
        'cursor-pointer select-none px-3 py-2 text-sm',
        active ? 'bg-teal-600/20 text-white' : 'text-gray-200',
        selected && 'font-medium'
      )}
      onMouseEnter={onMouseEnter}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      {label}
    </li>
  );
}

export default Option;
