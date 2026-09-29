import React from 'react';

export type UseTypeaheadOptions = {
  /** Optional upper bound on results shown */
  limit?: number;
  /** Restrict search range to [from, to] inclusive (e.g., a decade) */
  from?: number;
  to?: number;
};

/**
 * Lightweight typeahead for numeric year strings against a precomputed range.
 * Filters using startsWith on the string value of each year.
 */
export function useTypeahead(allYears: number[], query: string, opts: UseTypeaheadOptions = {}) {
  const { limit = 20, from, to } = opts;

  const filteredYears = React.useMemo(() => {
    const pool = typeof from === 'number' && typeof to === 'number'
      ? allYears.filter((y) => y >= from && y <= to)
      : allYears.slice();

    const q = (query || '').trim();
    if (!q) return pool.slice(0, limit);

    const out: number[] = [];
    for (const y of pool) {
      if (String(y).startsWith(q)) {
        out.push(y);
        if (out.length >= limit) break;
      }
    }
    return out;
  }, [allYears, query, limit, from, to]);

  return filteredYears;
}

export default useTypeahead;

