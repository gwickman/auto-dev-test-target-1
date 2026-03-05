import { isNonNegative } from '../validation/index.js';
import { InvalidNumberError } from '../errors/index.js';

export function sleep(ms: number): Promise<void> {
  if (!isNonNegative(ms)) {
    return Promise.reject(new InvalidNumberError(`Expected a non-negative number, got ${ms}`));
  }
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}
