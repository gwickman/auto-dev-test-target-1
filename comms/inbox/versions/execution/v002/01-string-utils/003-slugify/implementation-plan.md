# Implementation Plan: slugify

## Overview
Add URL slug generation to string utilities.

## Steps

### Step 1: Create src/string/slugify.ts
```typescript
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
```

### Step 2: Update src/string/index.ts
```typescript
export { reverse } from './reverse.js';
export { truncate } from './truncate.js';
export { slugify } from './slugify.js';
```

### Step 3: Create tests/string/slugify.test.ts
```typescript
import { slugify } from '../../src/index.js';

describe('slugify', () => {
  it('converts to lowercase with hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });

  it('collapses multiple spaces/hyphens', () => {
    expect(slugify('hello   world')).toBe('hello-world');
  });

  it('trims leading/trailing hyphens', () => {
    expect(slugify('  hello world  ')).toBe('hello-world');
  });

  it('handles empty string', () => {
    expect(slugify('')).toBe('');
  });
});
```

### Step 4: Verify
- Run `npm run build`
- Run `npm test`

## Verification
- [ ] Build succeeds
- [ ] All tests pass