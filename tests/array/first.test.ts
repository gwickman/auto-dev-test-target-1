import { first } from '../../src/index.js';

describe('first', () => {
  it('returns first element of non-empty array', () => {
    expect(first([1, 2, 3])).toBe(1);
    expect(first(['a', 'b', 'c'])).toBe('a');
    expect(first([true, false])).toBe(true);
  });

  it('returns undefined for empty array', () => {
    expect(first([])).toBeUndefined();
  });

  it('returns element for single-element array', () => {
    expect(first([42])).toBe(42);
    expect(first(['only'])).toBe('only');
  });

  it('preserves generic type', () => {
    const numbers = [1, 2, 3];
    const result: number | undefined = first(numbers);
    expect(typeof result).toBe('number');

    const strings = ['a', 'b'];
    const strResult: string | undefined = first(strings);
    expect(typeof strResult).toBe('string');
  });

  it('supports type narrowing', () => {
    const arr = [10, 20, 30];
    const value = first(arr);

    if (value !== undefined) {
      const doubled: number = value * 2;
      expect(doubled).toBe(20);
    }
  });
});
