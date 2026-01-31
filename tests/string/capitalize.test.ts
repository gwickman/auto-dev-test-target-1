import { capitalize } from '../../src/index.js';

describe('capitalize', () => {
  it('capitalizes the first character and lowercases the rest', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('HELLO')).toBe('Hello');
    expect(capitalize('hELLO')).toBe('Hello');
  });

  it('handles empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('handles single character', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('A')).toBe('A');
  });

  it('handles strings with spaces', () => {
    expect(capitalize('hello world')).toBe('Hello world');
  });

  it('handles unicode', () => {
    expect(capitalize('café')).toBe('Café');
  });
});
