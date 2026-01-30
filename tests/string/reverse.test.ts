import { reverse } from '../../src/index.js';

describe('reverse', () => {
  it('reverses a string', () => {
    expect(reverse('hello')).toBe('olleh');
  });

  it('handles empty string', () => {
    expect(reverse('')).toBe('');
  });

  it('handles single character', () => {
    expect(reverse('a')).toBe('a');
  });

  it('handles unicode', () => {
    expect(reverse('café')).toBe('éfac');
  });
});
