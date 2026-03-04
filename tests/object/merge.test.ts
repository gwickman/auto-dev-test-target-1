import { describe, expect, it } from '@jest/globals';
import { merge } from '../../src/index.js';

type AnyRecord = Record<string, unknown>;

describe('merge', () => {
  it('merges two flat objects', () => {
    const result = merge({ a: 1 } as AnyRecord, { b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('later source overrides earlier for same key', () => {
    const result = merge({ a: 1 }, { a: 2 }, { a: 3 });
    expect(result).toEqual({ a: 3 });
  });

  it('deep merges nested objects', () => {
    const result = merge(
      { a: { x: 1 } } as AnyRecord,
      { a: { y: 2 } },
    );
    expect(result).toEqual({ a: { x: 1, y: 2 } });
  });

  it('array index-based merge: merge({a:[1,2,3]}, {a:[4]}) produces {a:[4,2,3]}', () => {
    const result = merge({ a: [1, 2, 3] }, { a: [4] });
    expect(result).toEqual({ a: [4, 2, 3] });
  });

  it('merges three or more sources', () => {
    const result = merge({ a: 1 } as AnyRecord, { b: 2 }, { c: 3 }, { d: 4 });
    expect(result).toEqual({ a: 1, b: 2, c: 3, d: 4 });
  });

  it('skips null source without error', () => {
    const result = merge({ a: 1 } as AnyRecord, null as unknown as AnyRecord, { b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('skips undefined source without error', () => {
    const result = merge({ a: 1 } as AnyRecord, undefined as unknown as AnyRecord, { b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('does not mutate target object', () => {
    const target = { a: 1, b: { c: 2 } };
    const original = { a: 1, b: { c: 2 } };
    merge(target, { a: 99 });
    expect(target).toEqual(original);
  });

  it('does not mutate source objects', () => {
    const source = { a: { x: 1 } } as AnyRecord;
    const sourceCopy = { a: { x: 1 } };
    merge({ a: { y: 2 } } as AnyRecord, source);
    expect(source).toEqual(sourceCopy);
  });

  it('handles nested object within array merge', () => {
    const result = merge(
      { items: [{ id: 1 }, { id: 2 }] },
      { items: [{ id: 10 }] },
    );
    expect(result).toEqual({ items: [{ id: 10 }, { id: 2 }] });
  });

  it('merges when source adds new keys', () => {
    const result = merge({ a: 1 } as AnyRecord, { b: 2, c: 3 });
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('merges when source has subset of keys', () => {
    const result = merge({ a: 1, b: 2, c: 3 }, { b: 99 });
    expect(result).toEqual({ a: 1, b: 99, c: 3 });
  });

  it('empty source object produces no change', () => {
    const result = merge({ a: 1, b: 2 }, {});
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('deeply nested merge (3+ levels)', () => {
    const result = merge(
      { l1: { l2: { l3: { val: 'original' } } } } as AnyRecord,
      { l1: { l2: { l3: { extra: 'added' } } } },
    );
    expect(result).toEqual({ l1: { l2: { l3: { val: 'original', extra: 'added' } } } });
  });

  it('merge with mixed types: object value overwritten by primitive', () => {
    const result = merge(
      { a: { nested: true } } as AnyRecord,
      { a: 42 },
    );
    expect(result).toEqual({ a: 42 });
  });

  it('primitive source value overwrites object target value', () => {
    const result = merge(
      { a: 'hello' } as AnyRecord,
      { a: { nested: true } },
    );
    expect(result).toEqual({ a: { nested: true } });
  });

  it('end-to-end: importing merge from package root produces correct deep-merged result', () => {
    const result = merge(
      { user: { name: 'Alice', settings: { theme: 'light', lang: 'en' } } } as AnyRecord,
      { user: { settings: { theme: 'dark' } } },
      { user: { name: 'Bob' } },
    );
    expect(result).toEqual({
      user: { name: 'Bob', settings: { theme: 'dark', lang: 'en' } },
    });
  });
});
