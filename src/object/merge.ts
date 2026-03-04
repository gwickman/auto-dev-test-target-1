import { isPlainObject } from '../validation/index.js';

/**
 * Deep merges multiple source objects into a target object recursively.
 *
 * - Plain objects are merged recursively (keys from sources override target keys).
 * - Arrays use an **index-based** merge strategy: each source array element
 *   overwrites the target array element at the same index.
 * - Primitive values from later sources override earlier ones.
 * - `null` and `undefined` sources are silently skipped.
 *
 * **Warning:** This function does not detect or handle circular references.
 * Passing objects with circular references will cause infinite recursion.
 *
 * @param target - The base object to merge into
 * @param sources - One or more source objects whose properties are merged into target
 * @returns A new object containing the deep-merged result
 */
export function merge<T extends Record<string, unknown>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  const result: Record<string, unknown> = { ...target };

  for (const source of sources) {
    if (source == null) continue;

    for (const key of Object.keys(source)) {
      const sourceVal = (source as Record<string, unknown>)[key];
      const resultVal = result[key];

      if (isPlainObject(resultVal) && isPlainObject(sourceVal)) {
        result[key] = merge(
          resultVal as Record<string, unknown>,
          sourceVal as Record<string, unknown>,
        );
      } else if (Array.isArray(resultVal) && Array.isArray(sourceVal)) {
        const merged = [...resultVal];
        for (let i = 0; i < sourceVal.length; i++) {
          merged[i] = sourceVal[i];
        }
        result[key] = merged;
      } else {
        result[key] = sourceVal;
      }
    }
  }

  return result as T;
}
