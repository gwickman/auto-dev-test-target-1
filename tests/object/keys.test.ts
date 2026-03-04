import { keys } from '../../src/object/keys';

describe('keys', () => {
  it('returns keys of a populated object', () => {
    const result = keys({ a: 1, b: 2, c: 3 });
    expect(result.sort()).toEqual(['a', 'b', 'c']);
  });

  it('returns empty array for empty object', () => {
    expect(keys({})).toEqual([]);
  });

  it('returns correct type - (keyof T)[]', () => {
    const obj = { x: 1, y: 'hello' };
    const result = keys(obj);
    // TypeScript should infer result as ('x' | 'y')[]
    const _check: ('x' | 'y')[] = result;
    expect(_check).toBeDefined();
  });

  it('does not include inherited prototype properties', () => {
    const parent = { inherited: true };
    const child = Object.create(parent);
    child.own = 'value';
    expect(keys(child)).toEqual(['own']);
  });

  it('handles objects with various value types', () => {
    const obj = { str: 'a', num: 1, bool: true, arr: [1], obj: { nested: 1 } };
    expect(keys(obj).sort()).toEqual(['arr', 'bool', 'num', 'obj', 'str']);
  });

  it('handles single-property objects', () => {
    expect(keys({ only: 42 })).toEqual(['only']);
  });
});
