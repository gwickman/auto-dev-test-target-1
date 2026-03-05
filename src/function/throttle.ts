import { isPositiveNumber } from '../validation/index.js';
import { InvalidNumberError } from '../errors/index.js';

export function throttle<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  if (!isPositiveNumber(ms)) {
    throw new InvalidNumberError(`Expected a positive number for ms, got: ${ms}`);
  }

  let lastCall = 0;

  return function (this: any, ...args: any[]) {
    const now = Date.now();
    if (now - lastCall >= ms) {
      lastCall = now;
      return fn.apply(this, args);
    }
  } as unknown as T;
}
