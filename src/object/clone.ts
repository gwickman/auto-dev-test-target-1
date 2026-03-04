import { ValidationError } from '../errors/index.js';

/**
 * Creates a deep copy of the given value using `structuredClone`.
 *
 * Supports all types handled by the structured clone algorithm including
 * plain objects, arrays, Date, RegExp, Map, Set, ArrayBuffer, and
 * circular references.
 *
 * @param obj - The value to clone
 * @returns A deep copy of the input
 * @throws {ValidationError} If the input is a function or symbol (not cloneable)
 */
export function clone<T>(obj: T): T {
  if (typeof obj === 'function') {
    throw new ValidationError('Input is not cloneable: functions cannot be cloned', 'obj');
  }
  if (typeof obj === 'symbol') {
    throw new ValidationError('Input is not cloneable: symbols cannot be cloned', 'obj');
  }
  return structuredClone(obj);
}
