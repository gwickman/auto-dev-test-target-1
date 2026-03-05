import { isPositiveNumber } from '../validation/index.js';
import { InvalidNumberError } from '../errors/index.js';

export async function retry<T>(fn: () => Promise<T>, attempts: number): Promise<T> {
  if (!isPositiveNumber(attempts) || !Number.isInteger(attempts)) {
    throw new InvalidNumberError(`Expected a positive integer, got ${attempts}`);
  }

  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === attempts - 1) throw error;
    }
  }

  // Unreachable, but satisfies TypeScript
  throw new Error('Unreachable');
}
