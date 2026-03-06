/** Capitalises the first letter of every word */
export const capitalize = str => str.replace(/\b\w/g, c => c.toUpperCase());

/**
 * Unbiased Fisher-Yates shuffle — returns a new array.
 * Replaces the old Math.random() - 0.5 sort trick which produces
 * non-uniform distributions.
 */
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
