import React from 'react';
import { agesAnchored } from '../utils/age';
import { clamp } from '../utils/math';
import { cx } from '../utils/a11y';
import Option from './Option';
import VisuallyHidden from './VisuallyHidden';
import { useAnchoredScroll } from '../hooks/useAnchoredScroll';

export type AnchoredListProps = {
  id?: string;
  label?: string;
  minAge?: number;
  maxAge?: number;
  anchor?: number; // age to center around
  value: number | null;
  onChange: (age: number) => void;
  className?: string;
  height?: number; // px height for the scroll area
};

export function AnchoredList({
  id = 'age-anchored-' + Math.random().toString(36).slice(2, 8),
  label = 'Age',
  minAge = 18,
  maxAge = 100,
  anchor = 30,
  value,
  onChange,
  className,
  height = 240,
}: AnchoredListProps) {
  const items = React.useMemo(() => agesAnchored(minAge, maxAge, anchor), [minAge, maxAge, anchor]);

  const optionId = React.useCallback((i: number) => id + '-opt-' + i, [id]);
  const a11yListId = id + '-list';
  const a11yLabelId = id + '-label';

  const selectedIndex = React.useMemo(() =>
    value == null ? -1 : items.findIndex((a) => a === value)
  , [items, value]);

  const [activeIndex, setActiveIndex] = React.useState<number>(() => selectedIndex >= 0 ? selectedIndex : 0);

  React.useEffect(() => {
    if (selectedIndex >= 0) setActiveIndex(selectedIndex);
  }, [selectedIndex]);

  const { containerRef, ensureVisible, centerOn } = useAnchoredScroll(optionId);

  // Center the anchor on mount for minimal initial scroll to nearby ages
  React.useEffect(() => {
    const anchorIdx = items.findIndex((a) => a === clamp(anchor, minAge, maxAge));
    if (anchorIdx >= 0) {
      // Defer until DOM paints
      setTimeout(() => centerOn(anchorIdx), 0);
    }
  }, [items, anchor, minAge, maxAge, centerOn]);

  const move = (delta: number) => {
    setActiveIndex((i) => {
      const next = Math.min(items.length - 1, Math.max(0, i + delta));
      ensureVisible(next);
      return next;
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); move(1); break;
      case 'ArrowUp': e.preventDefault(); move(-1); break;
      case 'Home': e.preventDefault(); setActiveIndex(0); ensureVisible(0); break;
      case 'End': e.preventDefault(); setActiveIndex(items.length - 1); ensureVisible(items.length - 1); break;
      case 'PageDown': e.preventDefault(); move(5); break;
      case 'PageUp': e.preventDefault(); move(-5); break;
      case 'Enter':
      case ' ': {
        e.preventDefault();
        if (activeIndex >= 0) onChange(items[activeIndex]);
        break;
      }
    }
  };

  return (
    <div className={cx('w-full', className)}>
      <VisuallyHidden as="label" id={a11yLabelId} htmlFor={a11yListId}>{label}</VisuallyHidden>
      <ul
        id={a11yListId}
        role="listbox"
        aria-labelledby={a11yLabelId}
        tabIndex={0}
        className="anchored-list"
        style={{ maxHeight: height, height }}
        onKeyDown={onKeyDown}
        ref={containerRef}
      >
        {items.map((age, i) => (
          <Option
            key={age}
            id={optionId(i)}
            label={String(age)}
            active={i === activeIndex}
            selected={i === selectedIndex}
            onMouseEnter={() => setActiveIndex(i)}
            onClick={() => onChange(age)}
          />
        ))}
      </ul>
    </div>
  );
}

export default AnchoredList;
