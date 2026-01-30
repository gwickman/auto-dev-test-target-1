# Implementation Plan: clamp

## Overview
Create the first number utility function with proper module structure.

## Steps

### Step 1: Create directory structure
```bash
mkdir -p src/number
mkdir -p tests/number
```

### Step 2: Create src/number/clamp.ts
```typescript
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error('min must be less than or equal to max');
  }
  return Math.min(Math.max(value, min), max);
}
```

### Step 3: Create src/number/index.ts
```typescript
export { clamp } from './clamp.js';
```

### Step 4: Update src/index.ts
```typescript
export * from './string/index.js';
export * from './number/index.js';
```

### Step 5: Create tests/number/clamp.test.ts
```typescript
import { clamp } from '../../src/index.js';

describe('clamp', () => {
  it('returns value when in range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('returns min when value too low', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('returns max when value too high', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('handles edge at min', () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  it('handles edge at max', () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it('throws if min > max', () => {
    expect(() => clamp(5, 10, 0)).toThrow();
  });
});
```

### Step 6: Verify
- Run `npm run build`
- Run `npm test`

## Verification
- [ ] Build succeeds
- [ ] All 6 tests pass