# Implementation Plan: reverse

## Overview
Create the first string utility function with proper module structure.

## Steps

### Step 1: Create directory structure
```bash
mkdir -p src/string
mkdir -p tests/string
```

### Step 2: Create src/string/reverse.ts
```typescript
export function reverse(str: string): string {
  return [...str].reverse().join('');
}
```

### Step 3: Create src/string/index.ts
```typescript
export { reverse } from './reverse.js';
```

### Step 4: Update src/index.ts
```typescript
export * from './string/index.js';
```

### Step 5: Create tests/string/reverse.test.ts
```typescript
import { reverse } from '../../src/index.js';

describe('reverse', () => {
  it('reverses a string', () => {
    expect(reverse('hello')).toBe('olleh');
  });

  it('handles empty string', () => {
    expect(reverse('')).toBe('');
  });

  it('handles single character', () => {
    expect(reverse('a')).toBe('a');
  });

  it('handles unicode', () => {
    expect(reverse('café')).toBe('éfac');
  });
});
```

### Step 6: Verify
- Run `npm run build`
- Run `npm test`

## Verification
- [ ] Build succeeds
- [ ] All 4 tests pass