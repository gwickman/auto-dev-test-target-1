# Implementation Plan: truncate

## Overview
Add truncation function to string utilities.

## Steps

### Step 1: Create src/string/truncate.ts
```typescript
export function truncate(str: string, maxLength: number, suffix = '...'): string {
  if (maxLength < suffix.length) {
    throw new Error(`maxLength must be at least ${suffix.length}`);
  }
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - suffix.length) + suffix;
}
```

### Step 2: Update src/string/index.ts
```typescript
export { reverse } from './reverse.js';
export { truncate } from './truncate.js';
```

### Step 3: Create tests/string/truncate.test.ts
```typescript
import { truncate } from '../../src/index.js';

describe('truncate', () => {
  it('truncates long strings', () => {
    expect(truncate('hello world', 8)).toBe('hello...');
  });

  it('returns short strings unchanged', () => {
    expect(truncate('hi', 10)).toBe('hi');
  });

  it('uses custom suffix', () => {
    expect(truncate('hello world', 7, '…')).toBe('hello …');
  });

  it('throws if maxLength too small', () => {
    expect(() => truncate('test', 2)).toThrow();
  });
});
```

### Step 4: Verify
- Run `npm run build`
- Run `npm test`

## Verification
- [ ] Build succeeds
- [ ] All tests pass