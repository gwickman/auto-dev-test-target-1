# Implementation Plan: validators

## Overview
Create validation utilities with type guards and assertions.

## Steps

### Step 1: Create directory
```bash
mkdir -p src/validation
mkdir -p tests/validation
```

### Step 2: Create src/validation/index.ts
```typescript
import { EmptyStringError } from '../errors/index.js';

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

export function isPositiveNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

export function assertNonEmptyString(value: unknown, field?: string): asserts value is string {
  if (!isNonEmptyString(value)) {
    throw new EmptyStringError(field);
  }
}
```

### Step 3: Update src/index.ts
Add export for validation module.

### Step 4: Create tests/validation/index.test.ts
Test each function with valid/invalid inputs.

### Step 5: Verify
- Run `npm run build`
- Run `npm test`

## Verification
- [ ] Build succeeds
- [ ] All tests pass