# Implementation Plan: integrate-validation

## Overview
Refactor existing utils to use custom errors from the errors module.

## Steps

### Step 1: Update src/string/truncate.ts
```typescript
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
```

### Step 2: Update src/number/clamp.ts
```typescript
import { OutOfRangeError } from '../errors/index.js';

export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new OutOfRangeError(min, max, max, 'min');
  }
  return Math.min(Math.max(value, min), max);
}
```

### Step 3: Update src/number/roundTo.ts
```typescript
import { InvalidNumberError } from '../errors/index.js';

export function roundTo(value: number, decimals: number): number {
  if (decimals < 0 || !Number.isInteger(decimals)) {
    throw new InvalidNumberError('decimals must be a non-negative integer', 'decimals');
  }
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
```

### Step 4: Update tests
Update existing tests that check for throws to verify error types.
Add new tests for the new validation cases.

### Step 5: Verify
- Run `npm run build`
- Run `npm test`
- Ensure all existing tests still pass

## Verification
- [ ] Build succeeds
- [ ] All tests pass (existing + new)
- [ ] Error types are correct