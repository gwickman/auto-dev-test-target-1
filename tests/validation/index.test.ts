import { describe, expect, it } from '@jest/globals';
import {
  isNonEmptyString,
  isPositiveNumber,
  isInRange,
  assertNonEmptyString,
  EmptyStringError,
} from '../../src/index.js';

describe('isNonEmptyString', () => {
  it('returns true for non-empty strings', () => {
    expect(isNonEmptyString('hello')).toBe(true);
    expect(isNonEmptyString('a')).toBe(true);
    expect(isNonEmptyString(' ')).toBe(true);
  });

  it('returns false for empty strings', () => {
    expect(isNonEmptyString('')).toBe(false);
  });

  it('returns false for non-string values', () => {
    expect(isNonEmptyString(null)).toBe(false);
    expect(isNonEmptyString(undefined)).toBe(false);
    expect(isNonEmptyString(123)).toBe(false);
    expect(isNonEmptyString(true)).toBe(false);
    expect(isNonEmptyString({})).toBe(false);
    expect(isNonEmptyString([])).toBe(false);
  });

  it('narrows type correctly', () => {
    const value: unknown = 'test';
    if (isNonEmptyString(value)) {
      const length: number = value.length;
      expect(length).toBe(4);
    }
  });
});

describe('isPositiveNumber', () => {
  it('returns true for positive numbers', () => {
    expect(isPositiveNumber(1)).toBe(true);
    expect(isPositiveNumber(0.1)).toBe(true);
    expect(isPositiveNumber(100)).toBe(true);
  });

  it('returns false for zero', () => {
    expect(isPositiveNumber(0)).toBe(false);
  });

  it('returns false for negative numbers', () => {
    expect(isPositiveNumber(-1)).toBe(false);
    expect(isPositiveNumber(-0.1)).toBe(false);
  });

  it('returns false for non-finite numbers', () => {
    expect(isPositiveNumber(Infinity)).toBe(false);
    expect(isPositiveNumber(-Infinity)).toBe(false);
    expect(isPositiveNumber(NaN)).toBe(false);
  });

  it('returns false for non-number values', () => {
    expect(isPositiveNumber('1')).toBe(false);
    expect(isPositiveNumber(null)).toBe(false);
    expect(isPositiveNumber(undefined)).toBe(false);
    expect(isPositiveNumber(true)).toBe(false);
    expect(isPositiveNumber({})).toBe(false);
    expect(isPositiveNumber([])).toBe(false);
  });

  it('narrows type correctly', () => {
    const value: unknown = 42;
    if (isPositiveNumber(value)) {
      const doubled: number = value * 2;
      expect(doubled).toBe(84);
    }
  });
});

describe('isInRange', () => {
  it('returns true when value is within range', () => {
    expect(isInRange(5, 0, 10)).toBe(true);
    expect(isInRange(0, 0, 10)).toBe(true);
    expect(isInRange(10, 0, 10)).toBe(true);
  });

  it('returns false when value is outside range', () => {
    expect(isInRange(-1, 0, 10)).toBe(false);
    expect(isInRange(11, 0, 10)).toBe(false);
  });

  it('handles negative ranges', () => {
    expect(isInRange(-5, -10, 0)).toBe(true);
    expect(isInRange(-11, -10, 0)).toBe(false);
    expect(isInRange(1, -10, 0)).toBe(false);
  });

  it('handles decimal values', () => {
    expect(isInRange(5.5, 5.0, 6.0)).toBe(true);
    expect(isInRange(4.9, 5.0, 6.0)).toBe(false);
  });
});

describe('assertNonEmptyString', () => {
  it('does not throw for non-empty strings', () => {
    expect(() => assertNonEmptyString('hello')).not.toThrow();
    expect(() => assertNonEmptyString('a')).not.toThrow();
  });

  it('throws EmptyStringError for empty strings', () => {
    expect(() => assertNonEmptyString('')).toThrow(EmptyStringError);
  });

  it('throws EmptyStringError for non-string values', () => {
    expect(() => assertNonEmptyString(null)).toThrow(EmptyStringError);
    expect(() => assertNonEmptyString(undefined)).toThrow(EmptyStringError);
    expect(() => assertNonEmptyString(123)).toThrow(EmptyStringError);
  });

  it('includes field name in error when provided', () => {
    try {
      assertNonEmptyString('', 'username');
      expect(true).toBe(false); // Should not reach here
    } catch (error) {
      expect(error).toBeInstanceOf(EmptyStringError);
      expect((error as EmptyStringError).field).toBe('username');
    }
  });

  it('narrows type correctly', () => {
    const value: unknown = 'test';
    assertNonEmptyString(value);
    const length: number = value.length;
    expect(length).toBe(4);
  });
});
