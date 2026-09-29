import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type ListNavOptions = {
  itemCount: number;
  initialIndex?: number; // highlighted index when activated
  loop?: boolean;
  /** milliseconds to keep typeahead buffer */
  typeaheadDelay?: number;
  /** Return the text label for index, used for typeahead */
  getLabel?: (index: number) => string;
};

export type ListNav = {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  move: (delta: number) => void;
  home: () => void;
  end: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  resetTypeahead: () => void;
};

export function useListNavigation(opts: ListNavOptions): ListNav {
  const { itemCount, initialIndex = 0, loop = false, typeaheadDelay = 700, getLabel } = opts;
  const [activeIndex, setActiveIndex] = useState(
    () => (itemCount > 0 ? Math.min(Math.max(initialIndex, 0), itemCount - 1) : -1)
  );

  useEffect(() => {
    if (itemCount === 0) setActiveIndex(-1);
    else if (activeIndex > itemCount - 1) setActiveIndex(itemCount - 1);
  }, [itemCount]);

  const move = useCallback(
    (delta: number) => {
      if (itemCount === 0) return;
      let next = activeIndex + delta;
      if (loop) {
        next = (next + itemCount) % itemCount;
      } else {
        next = Math.min(Math.max(next, 0), itemCount - 1);
      }
      setActiveIndex(next);
    },
    [activeIndex, itemCount, loop]
  );

  const home = useCallback(() => {
    if (itemCount > 0) setActiveIndex(0);
  }, [itemCount]);
  const end = useCallback(() => {
    if (itemCount > 0) setActiveIndex(itemCount - 1);
  }, [itemCount]);

  // Typeahead (simple startsWith matching on joined labels)
  const bufferRef = useRef('');
  const timerRef = useRef<number | null>(null);
  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  const resetTypeahead = useCallback(() => {
    bufferRef.current = '';
    clearTimer();
  }, []);

  const findMatch = useCallback(
    (buf: string) => {
      if (!getLabel || !buf) return -1;
      const b = buf.toLowerCase();
      for (let i = 0; i < itemCount; i++) {
        const label = getLabel(i)?.toLowerCase?.() ?? '';
        if (label.startsWith(b)) return i;
      }
      return -1;
    },
    [getLabel, itemCount]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          move(1);
          return;
        case 'ArrowUp':
          e.preventDefault();
          move(-1);
          return;
        case 'Home':
          e.preventDefault();
          home();
          return;
        case 'End':
          e.preventDefault();
          end();
          return;
        default: {
          // Typeahead: accept a–z, 0–9
          const isChar = e.key.length === 1 && /[\w\d]/.test(e.key);
          if (isChar) {
            const now = Date.now();
            const buf = bufferRef.current + e.key.toLowerCase();
            bufferRef.current = buf;
            clearTimer();
            timerRef.current = window.setTimeout(() => (bufferRef.current = ''), typeaheadDelay);
            const idx = findMatch(buf);
            if (idx >= 0) {
              e.preventDefault();
              setActiveIndex(idx);
            }
          }
        }
      }
    },
    [move, home, end, findMatch, typeaheadDelay]
  );

  return { activeIndex, setActiveIndex, move, home, end, onKeyDown, resetTypeahead };
}

export default useListNavigation;
