import React from 'react';
import { Input } from './ui/Input';
import { cx } from '../utils/a11y';
import { useTypeahead } from '../hooks/useTypeahead';
import validateYear from '../utils/validateYear';

export type YearInputProps = {
  id?: string;
  label?: string; // optional; parent may render label
  value: number | null;
  onChange: (year: number | null) => void;
  minYear: number;
  maxYear: number;
  from?: number; // optional bound for suggestions (e.g., decade start)
  to?: number;   // optional bound end
  placeholder?: string;
  className?: string;
};

export function YearInput({ id, label, value, onChange, minYear, maxYear, from, to, placeholder = 'Type year', className }: YearInputProps) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState(value ? String(value) : '');
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    // Sync when parent value changes from outside
    const s = value != null ? String(value) : '';
    setText((prev) => (prev !== s ? s : prev));
  }, [value]);

  const allYears = React.useMemo(() => {
    const out: number[] = [];
    for (let y = maxYear; y >= minYear; y--) out.push(y);
    return out;
  }, [minYear, maxYear]);

  const suggestions = useTypeahead(allYears, text, { from, to, limit: 10 });

  const validation = React.useMemo(() => {
    if (!text) return null;
    if (text.length < 4) return null; // wait until 4 digits
    return validateYear(text, from ?? minYear, to ?? maxYear);
  }, [text, minYear, maxYear, from, to]);

  const hasError = !!validation && !validation.valid;

  const commit = (yr: number | null) => {
    onChange(yr);
    setOpen(false);
    if (yr != null) setText(String(yr));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      if (open) {
        e.preventDefault();
        setOpen(false);
        return;
      }
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (text.length === 4) {
        const v = validateYear(text, from ?? minYear, to ?? maxYear);
        if (v.valid && typeof v.value === 'number') {
          commit(v.value);
          return;
        }
      }
      if (suggestions.length > 0) commit(suggestions[0]);
      return;
    }
  };

  return (
    <div className={cx('relative', className)}>
      {label && (
        <label htmlFor={id} className='block text-sm font-medium text-gray-200'>
          {label}
        </label>
      )}
      <div className={cx('mt-1')}>
        <Input
          id={id}
          pattern='[0-9]*'
          placeholder={placeholder}
          value={text}
          onChange={(e) => {
            const next = e.target.value.replace(/[^\d]/g, '');
            setText(next);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? (id ? id + '-error' : undefined) : undefined}
        />
        {hasError && (
          <p id={id ? id + '-error' : undefined} role='alert' className='mt-1 text-sm text-red-300'>
            {validation?.error}
          </p>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul
          ref={listRef}
          className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md border border-slate-700 bg-surface-raised py-1 shadow-xl'
          role='listbox'
        >
          {suggestions.map((y) => (
            <li key={y} role='option' className='cursor-pointer select-none px-3 py-2 text-sm text-gray-200 hover:bg-teal-600/20'
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => commit(y)}
            >
              {y}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default YearInput;

