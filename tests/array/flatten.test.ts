import { describe, expect, it } from '@jest/globals';
import { flatten, InvalidNumberError } from '../../src/index.js';

describe('flatten', () => {
  it('flattens nested array to depth 1 by default', () => {
    expect(flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
    expect(flatten([[1, [2]], [3, [4]]])).toEqual([1, [2], 3, [4]]);
  });

  it('returns shallow copy when depth is 0', () => {
    const input = [[1, 2], [3, 4]];
    const result = flatten(input, 0);
    expect(result).toEqual([[1, 2], [3, 4]]);
    expect(result).not.toBe(input); // Different instance
  });

  it('flattens one level when depth is 1', () => {
    expect(flatten([1, [2, [3, [4]]]], 1)).toEqual([1, 2, [3, [4]]]);
  });

  it('flattens two levels when depth is 2', () => {
    expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
  });

  it('flattens multiple levels when depth is 3+', () => {
    expect(flatten([1, [2, [3, [4, [5]]]]], 3)).toEqual([1, 2, 3, 4, [5]]);
  });

  it('fully flattens all levels when depth is Infinity', () => {
    expect(flatten([[[[[1]]]]], Infinity)).toEqual([1]);
    expect(flatten([1, [2, [3, [4, [5]]]]], Infinity)).toEqual([1, 2, 3, 4, 5]);
  });

  it('returns empty array for empty input', () => {
    expect(flatten([])).toEqual([]);
    expect(flatten([], 5)).toEqual([]);
  });

  it('returns copy when no nested arrays', () => {
    const input = [1, 2, 3];
    const result = flatten(input);
    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(input);
  });

  it('handles mixed nested and flat elements', () => {
    expect(flatten([1, [2], 3, [4, [5]]], 1)).toEqual([1, 2, 3, 4, [5]]);
    expect(flatten([1, [2], 3, [4, [5]]], 2)).toEqual([1, 2, 3, 4, 5]);
  });

  it('throws InvalidNumberError if depth is negative', () => {
    expect(() => flatten([[1, 2]], -1)).toThrow(InvalidNumberError);
    expect(() => flatten([[1, 2]], -5)).toThrow(InvalidNumberError);
  });

  it('throws InvalidNumberError if depth is not an integer', () => {
    expect(() => flatten([[1, 2]], 1.5)).toThrow(InvalidNumberError);
    expect(() => flatten([[1, 2]], 0.1)).toThrow(InvalidNumberError);
  });

  it('throws InvalidNumberError if depth is NaN', () => {
    expect(() => flatten([[1, 2]], NaN)).toThrow(InvalidNumberError);
  });

  it('preserves null and undefined in nested arrays', () => {
    expect(flatten([null, [undefined, [null]]], 2)).toEqual([null, undefined, null]);
  });
});
