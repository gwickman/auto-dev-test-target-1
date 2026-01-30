import { truncate } from '../../src/index.js';
import { EmptyStringError, InvalidNumberError } from '../../src/errors/index.js';

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

  it('throws InvalidNumberError if maxLength too small', () => {
    expect(() => truncate('test', 2)).toThrow(InvalidNumberError);
  });

  it('throws EmptyStringError if suffix is empty', () => {
    expect(() => truncate('test', 10, '')).toThrow(EmptyStringError);
  });

  it('throws InvalidNumberError if maxLength is not a positive integer', () => {
    expect(() => truncate('test', 0)).toThrow(InvalidNumberError);
    expect(() => truncate('test', -5)).toThrow(InvalidNumberError);
    expect(() => truncate('test', 3.5)).toThrow(InvalidNumberError);
  });
});
