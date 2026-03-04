/**
 * Creates a new object excluding the specified properties from the source object.
 *
 * For best type inference, pass the keys array as a literal (e.g., `['a', 'b'] as const`).
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const exclusionSet = new Set<PropertyKey>(keys);
  const result = {} as Omit<T, K>;
  for (const key of Object.keys(obj)) {
    if (!exclusionSet.has(key)) {
      (result as Record<string, unknown>)[key] = obj[key];
    }
  }
  return result;
}
