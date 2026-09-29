export type YearValidation = {
  valid: boolean;
  value?: number;
  error?: string;
};

/** Validate a 4-digit Gregorian year within [min, max]. */
export function validateYear(input: string, min: number, max: number): YearValidation {
  const raw = (input ?? '').trim();
  if (raw.length === 0) return { valid: false, error: 'Enter a 4-digit year' };
  if (!/^\d{1,4}$/.test(raw)) return { valid: false, error: 'Use digits only (0-9)' };
  if (raw.length < 4) return { valid: false, error: 'Enter all 4 digits' };

  const year = Number(raw);
  if (Number.isNaN(year)) return { valid: false, error: 'Enter a valid year' };
  if (year < min) return { valid: false, error: 'Year must be >= ' + String(min) };
  if (year > max) return { valid: false, error: 'Year must be <= ' + String(max) };
  return { valid: true, value: year };
}

export default validateYear;

