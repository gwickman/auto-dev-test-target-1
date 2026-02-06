import { compact } from '../../src/index.js';

describe('compact', () => {
  it('removes all falsy values from mixed array', () => {
    expect(compact([1, 0, 2, false, 3, null])).toEqual([1, 2, 3]);
    expect(compact(['a', '', 'b', undefined, 'c'])).toEqual(['a', 'b', 'c']);
  });

  it('removes all six falsy value types', () => {
    const input = [false, null, 0, '', undefined, NaN, 1, 'a'];
    const result = compact(input);
    expect(result).toEqual([1, 'a']);
  });

  it('preserves truthy values including empty objects and arrays', () => {
    expect(compact([{}, 0, []])).toEqual([{}, []]);
    expect(compact([{key: 'value'}, null, [1, 2]])).toEqual([{key: 'value'}, [1, 2]]);
  });

  it('preserves string "0" and other truthy strings', () => {
    expect(compact(['0', '1', ''])).toEqual(['0', '1']);
    expect(compact(['false', 'true'])).toEqual(['false', 'true']);
  });

  it('returns empty array for empty input', () => {
    expect(compact([])).toEqual([]);
  });

  it('returns copy when no falsy values', () => {
    const input = [1, 'a', true, {}];
    const result = compact(input);
    expect(result).toEqual([1, 'a', true, {}]);
    expect(result).not.toBe(input); // Different instance
  });

  it('returns empty array when all values are falsy', () => {
    expect(compact([null, undefined, false, 0, '', NaN])).toEqual([]);
  });

  it('preserves generic type', () => {
    const numbers = [1, 0, 2, null as number | null, 3];
    const numResult: (number | null)[] = compact(numbers);
    expect(numResult).toEqual([1, 2, 3]);

    const strings = ['a', '', 'b', undefined as string | undefined];
    const strResult: (string | undefined)[] = compact(strings);
    expect(strResult).toEqual(['a', 'b']);
  });

  it('handles negative numbers and special truthy values', () => {
    expect(compact([-1, 0, 1])).toEqual([-1, 1]);
    expect(compact([Infinity, 0, -Infinity])).toEqual([Infinity, -Infinity]);
  });
});
