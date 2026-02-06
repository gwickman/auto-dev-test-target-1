import { intersection } from '../../src/index.js';

describe('intersection', () => {
  it('returns common elements from two arrays', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
    expect(intersection(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual(['b', 'c']);
  });

  it('returns common elements from three or more arrays', () => {
    expect(intersection([1, 2, 3], [2, 3, 4], [3, 4, 5])).toEqual([3]);
    expect(intersection([1, 2], [1, 2], [1, 2], [1, 2])).toEqual([1, 2]);
  });

  it('returns empty array when no common elements', () => {
    expect(intersection([1, 2], [3, 4])).toEqual([]);
    expect(intersection([1, 2], [2, 3], [3, 4])).toEqual([]);
  });

  it('returns empty array when no arrays provided', () => {
    expect(intersection()).toEqual([]);
  });

  it('returns empty array when any input array is empty', () => {
    expect(intersection([1, 2], [])).toEqual([]);
    expect(intersection([], [1, 2])).toEqual([]);
  });

  it('returns unique elements when single array provided', () => {
    expect(intersection([1, 2, 2, 3])).toEqual([1, 2, 3]);
  });

  it('deduplicates result when first array has duplicates', () => {
    expect(intersection([1, 1, 2, 2], [1, 2])).toEqual([1, 2]);
  });

  it('uses strict equality for comparison', () => {
    expect(intersection([1, 2], ['1', '2'] as any[])).toEqual([]);
    expect(intersection([NaN], [NaN])).toEqual([NaN]);
  });

  it('preserves order from first array', () => {
    expect(intersection([3, 1, 2], [1, 2, 3])).toEqual([3, 1, 2]);
    expect(intersection([2, 3, 1], [1, 2, 3])).toEqual([2, 3, 1]);
  });

  it('preserves generic type', () => {
    const nums1 = [1, 2, 3];
    const nums2 = [2, 3, 4];
    const numResult: number[] = intersection(nums1, nums2);
    expect(numResult).toEqual([2, 3]);

    const strs1 = ['a', 'b'];
    const strs2 = ['b', 'c'];
    const strResult: string[] = intersection(strs1, strs2);
    expect(strResult).toEqual(['b']);
  });
});
