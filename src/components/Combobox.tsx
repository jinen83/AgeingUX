import React from 'react';
import { cx } from '../utils/a11y';
import { useListNavigation } from '../hooks/useListNavigation';
import { ariaCombobox, createAriaIds } from '../a11y/aria-combobox';

export type ComboboxProps<T> = {
  id?: string;
  label: string;
  items: T[];
  value: T | null;
  onChange: (value: T) => void;
  itemToString?: (item: T) => string;
  placeholder?: string;
  className?: string;
  openOnFocus?: boolean;
  initialActiveIndex?: number;
  disabled?: boolean;
};

export function Combobox<T>(props: ComboboxProps<T>) {
  const {
    id = 'cbx-' + Math.random().toString(36).slice(2, 8),
    label,
    items,
    value,
    onChange,
    itemToString = (i: any) => String(i),
    placeholder,
    className,
    openOnFocus = true,
    initialActiveIndex = 0,
    disabled,
  } = props;

  const ids = React.useMemo(() => createAriaIds(id), [id]);
  const a11y = React.useMemo(() => ariaCombobox(ids), [ids]);

  const selectedIndex = React.useMemo(() => {
    if (value == null) return -1;
    return items.findIndex((it) => itemToString(it) === itemToString(value));
  }, [value, items, itemToString]);

  const [open, setOpen] = React.useState(false);
  const nav = useListNavigation({
    itemCount: items.length,
    initialIndex: selectedIndex >= 0 ? selectedIndex : initialActiveIndex,
    loop: false,
    getLabel: (i: number) => itemToString(items[i]),
  });

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const listRef = React.useRef<HTMLUListElement | null>(null);

  React.useEffect(() => {
    if (open && listRef.current && nav.activeIndex >= 0) {
      const el = document.getElementById(ids.optionId(nav.activeIndex));
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [open, nav.activeIndex, ids]);

  function openList() {
    if (disabled) return;
    setOpen(true);
  }
  function closeList() {
    setOpen(false);
    nav.resetTypeahead();
  }

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      if (open) {
        e.preventDefault();
        closeList();
        return;
      }
    }

    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ')) {
      // Open and sync active index
      e.preventDefault();
      openList();
      return;
    }

    if (open) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const idx = nav.activeIndex >= 0 ? nav.activeIndex : selectedIndex;
        if (idx >= 0) onChange(items[idx]);
        closeList();
        return;
      }
      nav.onKeyDown(e);
    }
  };

  const onOptionClick = (index: number) => {
    onChange(items[index]);
    closeList();
    inputRef.current?.focus();
  };

  const display = selectedIndex >= 0 ? itemToString(items[selectedIndex]) : '';

  return (
    <div className={cx('w-full max-w-xs', className)}>
      <label id={ids.labelId} htmlFor={ids.inputId} className='block text-sm font-medium text-gray-200'>
        {label}
      </label>
      <div className='relative mt-1'>
        <input
          ref={inputRef}
          type='text'
          readOnly
          value={display}
          placeholder={placeholder}
          className={cx(
            'w-full rounded-md border border-slate-700 bg-surface-raised px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600/40',
            open && 'ring-2 ring-teal-600/40 border-teal-400'
          )}
          onFocus={() => openOnFocus && openList()}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={onInputKeyDown}
          {...a11y.inputProps({ expanded: open, activeIndex: nav.activeIndex, disabled })}
        />
        <div className='pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400' aria-hidden>
          <svg width='16' height='16' viewBox='0 0 20 20' fill='currentColor'><path d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z'/></svg>
        </div>

        {open && (
          <ul
            ref={listRef}
            className='absolute z-10 mt-1 max-h-64 w-full overflow-auto rounded-md border border-slate-700 bg-surface-raised py-1 shadow-xl focus:outline-none'
            {...a11y.listboxProps()}
          >
            {items.map((item, i) => {
              const isActive = i === nav.activeIndex;
              const isSelected = i === selectedIndex;
              return (
                <li
                  key={i}
                  className={cx(
                    'cursor-pointer select-none px-3 py-2 text-sm',
                    isActive ? 'bg-teal-600/20 text-white' : 'text-gray-200',
                    isSelected && 'font-medium'
                  )}
                  onMouseEnter={() => nav.setActiveIndex(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onOptionClick(i)}
                  {...a11y.optionProps(i, isSelected)}
                >
                  {itemToString(item)}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Combobox;
