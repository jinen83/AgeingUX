import React from 'react';

/**
 * Ensure the active option stays visible within a scroll container.
 * Option IDs should be predictable: optionId(index) → element id.
 */
export function useAnchoredScroll(optionId: (i: number) => string) {
  const containerRef = React.useRef<HTMLUListElement | null>(null);

  const ensureVisible = React.useCallback((index: number, block: ScrollLogicalPosition = 'nearest') => {
    const id = optionId(index);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ block });
  }, [optionId]);

  // Initial centering helper
  const centerOn = React.useCallback((index: number) => {
    const id = optionId(index);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ block: 'center' });
  }, [optionId]);

  return { containerRef, ensureVisible, centerOn } as const;
}

export default useAnchoredScroll;
