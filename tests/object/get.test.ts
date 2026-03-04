import { get } from '../../src/object/get';

describe('get', () => {
  it('gets a top-level property', () => {
    expect(get({ a: 1 }, 'a')).toBe(1);
  });

  it('gets a deeply nested property', () => {
    expect(get({ a: { b: { c: 42 } } }, 'a.b.c')).toBe(42);
  });

  it('gets an array element by index', () => {
    expect(get({ items: ['a', 'b', 'c'] }, 'items.0')).toBe('a');
  });

  it('gets a nested property through an array element', () => {
    const obj = { users: [{ name: 'Alice' }, { name: 'Bob' }] };
    expect(get(obj, 'users.1.name')).toBe('Bob');
  });

  it('returns undefined for a missing top-level property', () => {
    expect(get({ a: 1 }, 'b')).toBeUndefined();
  });

  it('returns undefined for a missing nested property', () => {
    expect(get({ a: { b: 1 } }, 'a.c.d')).toBeUndefined();
  });

  it('returns undefined when intermediate is null', () => {
    expect(get({ a: null }, 'a.b')).toBeUndefined();
  });

  it('returns undefined when intermediate is undefined', () => {
    expect(get({ a: undefined }, 'a.b')).toBeUndefined();
  });

  it('returns default value when path is missing', () => {
    expect(get({ a: 1 }, 'b.c', 'fallback')).toBe('fallback');
  });

  it('returns actual value (not default) when path exists', () => {
    expect(get({ a: { b: 2 } }, 'a.b', 'fallback')).toBe(2);
  });

  it('returns undefined for empty path string', () => {
    expect(get({ a: 1 }, '')).toBeUndefined();
  });

  it('handles consecutive dots gracefully', () => {
    expect(get({ a: { b: 1 } }, 'a..b')).toBeUndefined();
  });

  it('handles trailing dot gracefully', () => {
    expect(get({ a: 1 }, 'a.')).toBeUndefined();
  });

  it('works with various value types at leaf', () => {
    const obj = { s: 'str', n: 0, b: false, nil: null, arr: [1], o: { x: 1 } };
    expect(get(obj, 's')).toBe('str');
    expect(get(obj, 'n')).toBe(0);
    expect(get(obj, 'b')).toBe(false);
    expect(get(obj, 'nil')).toBeNull();
    expect(get(obj, 'arr')).toEqual([1]);
    expect(get(obj, 'o')).toEqual({ x: 1 });
  });

  it('end-to-end: importing get from package root retrieves correct nested values', async () => {
    const { get: getFromRoot } = await import('../../src/index');
    const obj = { user: { address: { city: 'Seattle' } } };
    expect(getFromRoot(obj, 'user.address.city')).toBe('Seattle');
  });
});
