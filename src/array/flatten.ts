import { InvalidNumberError } from '../errors/index.js';
import { isNonNegativeInteger } from '../validation/index.js';

export function flatten(arr: any[], depth: number = 1): any[] {
  // Handle Infinity explicitly (not an integer)
  if (depth === Infinity) {
    return arr.reduce((acc, val) => {
      return acc.concat(Array.isArray(val) ? flatten(val, Infinity) : val);
    }, []);
  }

  // Validate depth is non-negative integer
  if (!isNonNegativeInteger(depth)) {
    throw new InvalidNumberError('depth must be a non-negative integer', 'depth');
  }

  // Depth 0 returns shallow copy
  if (depth === 0) {
    return arr.slice();
  }

  // Recursive flatten with depth decrement
  return arr.reduce((acc, val) => {
    return acc.concat(
      Array.isArray(val) ? flatten(val, depth - 1) : val
    );
  }, []);
}
