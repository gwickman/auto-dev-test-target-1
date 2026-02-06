import { InvalidNumberError } from '../errors/index.js';
import { isPositiveNumber } from '../validation/index.js';

export function chunk<T>(arr: T[], size: number): T[][] {
  if (!isPositiveNumber(size) || !Number.isInteger(size)) {
    throw new InvalidNumberError('size must be a positive integer', 'size');
  }

  if (arr.length === 0) {
    return [];
  }

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
