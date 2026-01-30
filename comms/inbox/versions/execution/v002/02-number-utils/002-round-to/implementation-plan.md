# Implementation Plan: round-to

## Overview
Add decimal rounding function to number utilities.

## Steps

### Step 1: Create src/number/roundTo.ts
```typescript
export function roundTo(value: number, decimals: number): number {
  if (decimals < 0 || !Number.isInteger(decimals)) {
    throw new Error('decimals must be a non-negative integer');
  }
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
```

### Step 2: Update src/number/index.ts
```typescript
export { clamp } from './clamp.js';
export { roundTo } from './roundTo.js';
```

### Step 3: Create tests/number/roundTo.test.ts
```typescript
import { roundTo } from '../../src/index.js';

describe('roundTo', () => {
  it('rounds to 2 decimal places', () => {
    expect(roundTo(3.14159, 2)).toBe(3.14);
  });

  it('rounds to integer', () => {
    expect(roundTo(3.7, 0)).toBe(4);
  });

  it('rounds up at midpoint', () => {
    expect(roundTo(2.5, 0)).toBe(3);
  });

  it('handles already rounded values', () => {
    expect(roundTo(5.0, 2)).toBe(5);
  });

  it('throws for negative decimals', () => {
    expect(() => roundTo(5, -1)).toThrow();
  });

  it('throws for non-integer decimals', () => {
    expect(() => roundTo(5, 1.5)).toThrow();
  });
});
```

### Step 4: Verify
- Run `npm run build`
- Run `npm test`

## Verification
- [ ] Build succeeds
- [ ] All tests pass