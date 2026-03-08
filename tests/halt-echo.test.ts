import { haltEcho } from '../src/index.js';

describe('haltEcho', () => {
  it('returns the same message', () => {
    expect(haltEcho('hello')).toBe('hello');
  });

  it('returns an empty string when given an empty string', () => {
    expect(haltEcho('')).toBe('');
  });
});
