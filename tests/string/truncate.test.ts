import { truncate } from '../../src/index.js';

describe('truncate', () => {
  it('truncates long strings', () => {
    expect(truncate('hello world', 8)).toBe('hello...');
  });

  it('returns short strings unchanged', () => {
    expect(truncate('hi', 10)).toBe('hi');
  });

  it('uses custom suffix', () => {
    expect(truncate('hello world', 7, '…')).toBe('hello …');
  });

  it('throws if maxLength too small', () => {
    expect(() => truncate('test', 2)).toThrow();
  });
});
