import { omit } from '../../src/object/omit';

describe('omit', () => {
  it('omits a single property', () => {
    const result = omit({ a: 1, b: 2, c: 3 }, ['b']);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('omits multiple properties', () => {
    const result = omit({ a: 1, b: 2, c: 3 }, ['a', 'c']);
    expect(result).toEqual({ b: 2 });
  });

  it('returns copy of entire object for empty keys array', () => {
    const obj = { a: 1, b: 2 };
    const result = omit(obj, []);
    expect(result).toEqual({ a: 1, b: 2 });
    expect(result).not.toBe(obj);
  });

  it('returns empty object when all keys omitted', () => {
    const result = omit({ a: 1, b: 2 }, ['a', 'b']);
    expect(result).toEqual({});
  });

  it('preserves value types in result', () => {
    const obj = { name: 'Alice', age: 30, active: true };
    const result = omit(obj, ['active']);
    expect(typeof result.name).toBe('string');
    expect(typeof result.age).toBe('number');
  });

  it('does not mutate source object', () => {
    const original = { a: 1, b: 2, c: 3 };
    const copy = { ...original };
    omit(original, ['a']);
    expect(original).toEqual(copy);
  });

  it('works with objects containing various value types', () => {
    const obj = { str: 'hello', num: 42, bool: false, arr: [1, 2], nested: { x: 1 } };
    const result = omit(obj, ['num', 'bool']);
    expect(result).toEqual({ str: 'hello', arr: [1, 2], nested: { x: 1 } });
  });

  it('result excludes omitted keys (type assertion)', () => {
    const obj = { x: 10, y: 20, z: 30 };
    const result = omit(obj, ['y']);
    // TypeScript should infer result as Omit<typeof obj, 'y'>
    const _check: { x: number; z: number } = result;
    expect(Object.keys(_check).sort()).toEqual(['x', 'z']);
  });

  it('end-to-end: importing omit from package root returns correctly typed object without excluded keys', async () => {
    const { omit: omitFromRoot } = await import('../../src/index');
    const obj = { id: 1, name: 'test', extra: true };
    const result = omitFromRoot(obj, ['extra']);
    expect(result).toEqual({ id: 1, name: 'test' });
  });
});
