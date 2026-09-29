/**
 * Create a numeric range.
 *
 * - When start > end, returns a descending range (start, start-1, ..., end).
 * - When start < end, returns an ascending range (start, start+1, ..., end).
 * - The end value is inclusive.
 */
export function range(start: number, end: number, step = 1): number[] {
  if (step <= 0) throw new Error('range: step must be > 0');
  const out: number[] = [];
  if (start === end) return [start];
  const desc = start > end;
  if (desc) {
    for (let i = start; i >= end; i -= step) out.push(i);
  } else {
    for (let i = start; i <= end; i += step) out.push(i);
  }
  return out;
}

// Convenience helper for year lists (inclusive)
export function yearsDescending(fromYear: number, toYear: number): number[] {
  return range(fromYear, toYear, 1);
}

export default range;
