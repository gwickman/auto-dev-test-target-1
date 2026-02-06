import { chunk, InvalidNumberError } from '../../src/index.js';

describe('chunk', () => {
  it('splits array into chunks of specified size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([['a', 'b'], ['c', 'd']]);
  });

  it('returns empty array for empty input', () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it('returns single chunk when size equals array length', () => {
    expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
  });

  it('returns single chunk when size greater than array length', () => {
    expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
  });

  it('handles last chunk with remaining elements', () => {
    expect(chunk([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
  });

  it('creates single-element chunks when size is 1', () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });

  it('throws InvalidNumberError if size is not positive', () => {
    expect(() => chunk([1, 2, 3], 0)).toThrow(InvalidNumberError);
    expect(() => chunk([1, 2, 3], -5)).toThrow(InvalidNumberError);
  });

  it('throws InvalidNumberError if size is not an integer', () => {
    expect(() => chunk([1, 2, 3], 2.5)).toThrow(InvalidNumberError);
    expect(() => chunk([1, 2, 3], 1.1)).toThrow(InvalidNumberError);
  });

  it('throws InvalidNumberError if size is NaN or Infinity', () => {
    expect(() => chunk([1, 2, 3], NaN)).toThrow(InvalidNumberError);
    expect(() => chunk([1, 2, 3], Infinity)).toThrow(InvalidNumberError);
    expect(() => chunk([1, 2, 3], -Infinity)).toThrow(InvalidNumberError);
  });

  it('preserves generic type in nested arrays', () => {
    const numbers = [1, 2, 3, 4];
    const numResult: number[][] = chunk(numbers, 2);
    expect(numResult).toEqual([[1, 2], [3, 4]]);

    const strings = ['a', 'b', 'c'];
    const strResult: string[][] = chunk(strings, 2);
    expect(strResult).toEqual([['a', 'b'], ['c']]);
  });
});
