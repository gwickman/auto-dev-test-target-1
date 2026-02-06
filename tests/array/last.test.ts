import { last } from '../../src/index.js';

describe('last', () => {
  it('returns last element of non-empty array', () => {
    expect(last([1, 2, 3])).toBe(3);
    expect(last(['a', 'b', 'c'])).toBe('c');
    expect(last([true, false])).toBe(false);
  });

  it('returns undefined for empty array', () => {
    expect(last([])).toBeUndefined();
  });

  it('returns element for single-element array', () => {
    expect(last([42])).toBe(42);
    expect(last(['only'])).toBe('only');
  });

  it('preserves generic type', () => {
    const numbers = [1, 2, 3];
    const result: number | undefined = last(numbers);
    expect(typeof result).toBe('number');

    const strings = ['a', 'b'];
    const strResult: string | undefined = last(strings);
    expect(typeof strResult).toBe('string');
  });

  it('supports type narrowing', () => {
    const arr = [10, 20, 30];
    const value = last(arr);

    if (value !== undefined) {
      const doubled: number = value * 2;
      expect(doubled).toBe(60);
    }
  });
});
