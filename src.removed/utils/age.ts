import { clamp } from './math';

/**
 * Produce an age list anchored around a target age.
 * The sequence starts at ANCHOR then alternates +1, -1, +2, -2, ...
 * Values are clamped inside [minAge, maxAge] and de-duplicated.
 */
export function agesAnchored(
  minAge: number,
  maxAge: number,
  anchor: number
): number[] {
  if (minAge > maxAge) [minAge, maxAge] = [maxAge, minAge];
  const A = clamp(Math.round(anchor), minAge, maxAge);
  const out: number[] = [];
  const seen = new Set<number>();

  const push = (n: number) => {
    if (n < minAge || n > maxAge) return;
    if (seen.has(n)) return;
    seen.add(n);
    out.push(n);
  };

  push(A);
  let k = 1;
  while (out.length < maxAge - minAge + 1) {
    push(A + k);
    push(A - k);
    k += 1;
  }
  return out;
}

/** Utility to get current age from birth year. */
export function ageFromBirthYear(year: number, now = new Date()) {
  return now.getFullYear() - year;
}

/** Ensure age is within a sensible human range. */
export function normalizeAge(age: number, minAge = 0, maxAge = 120) {
  return clamp(Math.round(age), minAge, maxAge);
}

export default agesAnchored;
