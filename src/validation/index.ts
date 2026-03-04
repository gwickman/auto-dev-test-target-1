import { EmptyStringError } from '../errors/index.js';

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

export function isPositiveNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

export function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' &&
         Number.isInteger(value) &&
         Number.isFinite(value) &&
         value >= 0;
}

export function assertNonEmptyString(value: unknown, field?: string): asserts value is string {
  if (!isNonEmptyString(value)) {
    throw new EmptyStringError(field);
  }
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}
