# Requirements: reverse

## Objective
Implement a string reverse function.

## Functional Requirements

### FR-1: Function signature
```typescript
export function reverse(str: string): string
```

### FR-2: Behavior
- Returns the input string with characters in reverse order
- Empty string returns empty string
- Single character returns same character
- Handles unicode characters correctly

### FR-3: Location
- Create `src/string/reverse.ts`
- Export from `src/string/index.ts`
- Re-export from `src/index.ts`

## Acceptance Criteria
- [ ] Function exists at src/string/reverse.ts
- [ ] Exported from src/index.ts
- [ ] Tests exist at tests/string/reverse.test.ts
- [ ] All tests pass
- [ ] `npm run build` succeeds