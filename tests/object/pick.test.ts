import { pick } from '../../src/object/pick';

describe('pick', () => {
  it('picks a single property', () => {
    const result = pick({ a: 1, b: 2, c: 3 }, ['a']);
    expect(result).toEqual({ a: 1 });
  });

  it('picks multiple properties', () => {
    const result = pick({ a: 1, b: 2, c: 3 }, ['a', 'c']);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('returns empty object for empty keys array', () => {
    const result = pick({ a: 1, b: 2 }, []);
    expect(result).toEqual({});
  });

  it('preserves value types in result', () => {
    const obj = { name: 'Alice', age: 30, active: true };
    const result = pick(obj, ['name', 'age']);
    expect(typeof result.name).toBe('string');
    expect(typeof result.age).toBe('number');
  });

  it('does not mutate source object', () => {
    const original = { a: 1, b: 2, c: 3 };
    const copy = { ...original };
    pick(original, ['a']);
    expect(original).toEqual(copy);
  });

  it('works with objects containing various value types', () => {
    const obj = { str: 'hello', num: 42, bool: false, arr: [1, 2], nested: { x: 1 } };
    const result = pick(obj, ['str', 'arr', 'nested']);
    expect(result).toEqual({ str: 'hello', arr: [1, 2], nested: { x: 1 } });
  });

  it('handles picking all keys (returns copy)', () => {
    const obj = { a: 1, b: 2 };
    const result = pick(obj, ['a', 'b']);
    expect(result).toEqual(obj);
    expect(result).not.toBe(obj);
  });

  it('result has only picked keys (type assertion)', () => {
    const obj = { x: 10, y: 20, z: 30 };
    const result = pick(obj, ['x', 'z']);
    // TypeScript should infer result as Pick<typeof obj, 'x' | 'z'>
    const _check: { x: number; z: number } = result;
    expect(Object.keys(_check).sort()).toEqual(['x', 'z']);
  });

  it('end-to-end: importing pick from package root returns correctly typed subset', async () => {
    const { pick: pickFromRoot } = await import('../../src/index');
    const obj = { id: 1, name: 'test', extra: true };
    const result = pickFromRoot(obj, ['id', 'name']);
    expect(result).toEqual({ id: 1, name: 'test' });
  });
});
