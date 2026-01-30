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

export function assertNonEmptyString(value: unknown, field?: string): asserts value is string {
  if (!isNonEmptyString(value)) {
    throw new EmptyStringError(field);
  }
}
