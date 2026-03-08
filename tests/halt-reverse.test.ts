import { haltReverse } from '../src/index.js';

describe('haltReverse', () => {
  it('reverses a string', () => {
    expect(haltReverse('hello')).toBe('olleh');
  });

  it('returns an empty string when given an empty string', () => {
    expect(haltReverse('')).toBe('');
  });
});
