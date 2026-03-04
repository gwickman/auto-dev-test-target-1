import { isEmpty } from '../../src/object/isEmpty';

describe('isEmpty', () => {
  it('returns true for null', () => {
    expect(isEmpty(null)).toBe(true);
  });

  it('returns true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  it('returns true for empty string', () => {
    expect(isEmpty('')).toBe(true);
  });

  it('returns true for empty array', () => {
    expect(isEmpty([])).toBe(true);
  });

  it('returns true for empty object', () => {
    expect(isEmpty({})).toBe(true);
  });

  it('returns false for 0', () => {
    expect(isEmpty(0)).toBe(false);
  });

  it('returns false for false', () => {
    expect(isEmpty(false)).toBe(false);
  });

  it('returns false for NaN', () => {
    expect(isEmpty(NaN)).toBe(false);
  });

  it('returns false for non-empty string', () => {
    expect(isEmpty('hello')).toBe(false);
  });

  it('returns false for non-empty array', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  it('returns false for object with properties', () => {
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  it('returns false for non-zero number', () => {
    expect(isEmpty(42)).toBe(false);
  });

  it('returns false for boolean true', () => {
    expect(isEmpty(true)).toBe(false);
  });

  it('returns false for Date object', () => {
    expect(isEmpty(new Date())).toBe(false);
  });

  it('returns false for nested empty object (has structure)', () => {
    expect(isEmpty({ a: {} })).toBe(false);
  });

  it('imports correctly from package root', async () => {
    const { isEmpty: rootIsEmpty } = await import('../../src/index');
    expect(rootIsEmpty(null)).toBe(true);
    expect(rootIsEmpty({ a: 1 })).toBe(false);
  });
});
