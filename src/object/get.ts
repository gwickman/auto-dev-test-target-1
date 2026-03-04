/**
 * Safely retrieves a nested property value using a dot-notation path string.
 * Returns the default value (or undefined) if the path doesn't exist.
 */
export function get(
  obj: unknown,
  path: string,
  defaultValue?: unknown,
): unknown {
  if (typeof path !== 'string' || path === '') {
    return defaultValue ?? undefined;
  }

  const segments = path.split('.');
  let current: unknown = obj;

  for (const segment of segments) {
    if (current === null || current === undefined) {
      return defaultValue ?? undefined;
    }
    current = (current as Record<string, unknown>)[segment];
  }

  return current === undefined ? (defaultValue ?? undefined) : current;
}
