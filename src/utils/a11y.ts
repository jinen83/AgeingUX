/**
 * Concatenate class names conditionally.
 */
export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}
