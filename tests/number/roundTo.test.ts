import { roundTo } from '../../src/index.js';

describe('roundTo', () => {
  it('rounds to 2 decimal places', () => {
    expect(roundTo(3.14159, 2)).toBe(3.14);
  });

  it('rounds to integer', () => {
    expect(roundTo(3.7, 0)).toBe(4);
  });

  it('rounds up at midpoint', () => {
    expect(roundTo(2.5, 0)).toBe(3);
  });

  it('handles already rounded values', () => {
    expect(roundTo(5.0, 2)).toBe(5);
  });

  it('throws for negative decimals', () => {
    expect(() => roundTo(5, -1)).toThrow();
  });

  it('throws for non-integer decimals', () => {
    expect(() => roundTo(5, 1.5)).toThrow();
  });
});
