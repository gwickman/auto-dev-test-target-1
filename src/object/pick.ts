/**
 * Creates a new object with only the specified properties from the source object.
 *
 * For best type inference, pass the keys array as a literal (e.g., `['a', 'b'] as const`).
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}
