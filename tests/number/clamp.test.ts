import { clamp } from '../../src/index.js';

describe('clamp', () => {
  it('returns value when in range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('returns min when value too low', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('returns max when value too high', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('handles edge at min', () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  it('handles edge at max', () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it('throws if min > max', () => {
    expect(() => clamp(5, 10, 0)).toThrow();
  });
});
