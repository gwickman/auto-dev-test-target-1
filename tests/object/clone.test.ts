import { describe, expect, it } from '@jest/globals';
import { clone, ValidationError } from '../../src/index.js';

describe('clone', () => {
  it('deep copies a simple object', () => {
    const original = { a: 1, b: 'hello' };
    const cloned = clone(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });

  it('deep copies nested objects — modifying clone does not affect original', () => {
    const original = { a: { b: { c: 1 } } };
    const cloned = clone(original);
    cloned.a.b.c = 999;
    expect(original.a.b.c).toBe(1);
  });

  it('deep copies arrays within objects', () => {
    const original = { items: [1, 2, { nested: true }] };
    const cloned = clone(original);
    expect(cloned).toEqual(original);
    expect(cloned.items).not.toBe(original.items);
    expect(cloned.items[2]).not.toBe(original.items[2]);
  });

  it('deep copies Date objects (preserves value)', () => {
    const original = { date: new Date('2024-01-15T12:00:00Z') };
    const cloned = clone(original);
    expect(cloned.date.getTime()).toBe(original.date.getTime());
    expect(cloned.date).not.toBe(original.date);
    expect(typeof cloned.date.getTime).toBe('function');
  });

  it('deep copies RegExp objects', () => {
    const original = { pattern: /test/gi };
    const cloned = clone(original);
    expect(cloned.pattern.source).toBe('test');
    expect(cloned.pattern.flags).toBe('gi');
    expect(cloned.pattern).not.toBe(original.pattern);
    expect(typeof cloned.pattern.test).toBe('function');
  });

  it('handles circular references without error', () => {
    const original: Record<string, unknown> = { a: 1 };
    original.self = original;
    const cloned = clone(original);
    expect(cloned.a).toBe(1);
    expect(cloned.self).toBe(cloned);
    expect(cloned.self).not.toBe(original);
  });

  it('throws ValidationError for function input', () => {
    expect(() => clone(() => {})).toThrow(ValidationError);
  });

  it('throws ValidationError with descriptive message for functions', () => {
    expect(() => clone(() => {})).toThrow('Input is not cloneable: functions cannot be cloned');
  });

  it('throws ValidationError for symbol input', () => {
    expect(() => clone(Symbol('test'))).toThrow(ValidationError);
    expect(() => clone(Symbol('test'))).toThrow('Input is not cloneable: symbols cannot be cloned');
  });

  it('clones objects with null property values', () => {
    const original = { a: null, b: 'value' };
    const cloned = clone(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });

  it('clones objects with undefined property values', () => {
    const original = { a: undefined, b: 'value' };
    const cloned = clone(original);
    expect(cloned.a).toBeUndefined();
    expect(cloned.b).toBe('value');
  });

  it('clones empty object', () => {
    const cloned = clone({});
    expect(cloned).toEqual({});
  });

  it('clones arrays directly', () => {
    const original = [1, 2, { a: 3 }];
    const cloned = clone(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned[2]).not.toBe(original[2]);
  });

  it('clones primitives (string, number, boolean)', () => {
    expect(clone('hello')).toBe('hello');
    expect(clone(42)).toBe(42);
    expect(clone(true)).toBe(true);
  });

  it('end-to-end: importing clone from package root, cloning and mutating leaves original unchanged', () => {
    const original = { level1: { level2: { level3: [1, 2, 3] } } };
    const cloned = clone(original);
    cloned.level1.level2.level3.push(4);
    expect(original.level1.level2.level3).toEqual([1, 2, 3]);
    expect(cloned.level1.level2.level3).toEqual([1, 2, 3, 4]);
  });
});
