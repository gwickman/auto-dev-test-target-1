import { isNonNegative } from '../validation/index.js';
import { InvalidNumberError } from '../errors/index.js';

export function debounce<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  if (!isNonNegative(ms)) {
    throw new InvalidNumberError(`Expected a non-negative number for ms, got: ${ms}`);
  }

  let timer: ReturnType<typeof setTimeout> | undefined;

  return function (this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  } as unknown as T;
}
