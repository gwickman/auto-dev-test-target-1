import { slugify } from '../../src/index.js';

describe('slugify', () => {
  it('converts to lowercase with hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });

  it('collapses multiple spaces/hyphens', () => {
    expect(slugify('hello   world')).toBe('hello-world');
  });

  it('trims leading/trailing hyphens', () => {
    expect(slugify('  hello world  ')).toBe('hello-world');
  });

  it('handles empty string', () => {
    expect(slugify('')).toBe('');
  });
});
