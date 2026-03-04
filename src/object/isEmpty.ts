/**
 * Checks if a value is empty.
 *
 * A value is considered empty if it is:
 * - `null`
 * - `undefined`
 * - An empty string `''`
 * - An empty array `[]`
 * - An empty plain object `{}`
 *
 * Values that are NOT empty (even though some are falsy):
 * - `0`, `false`, `NaN`
 * - Non-empty strings, arrays, or objects
 * - Date, RegExp, Map, Set instances
 * - Nested empty objects like `{ a: {} }` (has own properties)
 */
export function isEmpty(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === 'string') return value.length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') {
    const proto = Object.getPrototypeOf(value);
    if (proto !== null && proto !== Object.prototype) return false;
    return Object.keys(value).length === 0;
  }
  return false;
}
