import { unique } from '../../src/index.js';

describe('unique', () => {
  it('removes duplicate primitive values', () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
    expect(unique([true, false, true])).toEqual([true, false]);
  });

  it('returns empty array for empty input', () => {
    expect(unique([])).toEqual([]);
  });

  it('returns copy when no duplicates', () => {
    const input = [1, 2, 3];
    const result = unique(input);
    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(input); // Different array instance
  });

  it('handles all duplicates', () => {
    expect(unique([1, 1, 1, 1])).toEqual([1]);
    expect(unique(['x', 'x'])).toEqual(['x']);
  });

  it('treats NaN values as equal', () => {
    expect(unique([NaN, NaN, NaN])).toEqual([NaN]);
    expect(unique([1, NaN, 2, NaN])).toEqual([1, NaN, 2]);
  });

  it('preserves order of first occurrence', () => {
    expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2]);
    expect(unique(['c', 'a', 'b', 'a'])).toEqual(['c', 'a', 'b']);
  });

  it('preserves generic type', () => {
    const numbers = [1, 2, 2, 3];
    const numResult: number[] = unique(numbers);
    expect(numResult).toEqual([1, 2, 3]);

    const strings = ['a', 'a', 'b'];
    const strResult: string[] = unique(strings);
    expect(strResult).toEqual(['a', 'b']);
  });

  it('handles special numeric values', () => {
    expect(unique([0, -0, 0])).toEqual([0]); // Set treats 0 and -0 as equal
    expect(unique([Infinity, Infinity])).toEqual([Infinity]);
    expect(unique([-Infinity, -Infinity])).toEqual([-Infinity]);
  });
});
