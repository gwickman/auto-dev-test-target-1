import { EmptyStringError, InvalidNumberError } from '../errors/index.js';

export function truncate(str: string, maxLength: number, suffix = '...'): string {
  if (suffix === '') {
    throw new EmptyStringError('suffix');
  }
  if (!Number.isInteger(maxLength) || maxLength < 1) {
    throw new InvalidNumberError('maxLength must be a positive integer', 'maxLength');
  }
  if (maxLength < suffix.length) {
    throw new InvalidNumberError(`maxLength must be at least ${suffix.length}`, 'maxLength');
  }
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - suffix.length) + suffix;
}
