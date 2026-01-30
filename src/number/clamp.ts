import { OutOfRangeError } from '../errors/index.js';

export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new OutOfRangeError(min, max, max, 'min');
  }
  return Math.min(Math.max(value, min), max);
}
