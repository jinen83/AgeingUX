export function clamp(n: number, min: number, max: number) {
  if (min > max) [min, max] = [max, min];
  return Math.min(max, Math.max(min, n));
}

export function inRange(n: number, min: number, max: number) {
  return n >= Math.min(min, max) && n <= Math.max(min, max);
}

export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export function between(n: number, a: number, b: number) {
  return n >= Math.min(a, b) && n <= Math.max(a, b);
}

export default clamp;
