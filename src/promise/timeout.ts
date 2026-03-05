import { isPositiveNumber } from '../validation/index.js';
import { InvalidNumberError, TimeoutError } from '../errors/index.js';

export function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  if (!isPositiveNumber(ms)) {
    throw new InvalidNumberError(`Expected a positive number, got ${ms}`);
  }

  let timer: ReturnType<typeof setTimeout>;
  const timerPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new TimeoutError(ms)), ms);
  });

  return Promise.race([promise, timerPromise]).finally(() => clearTimeout(timer));
}
