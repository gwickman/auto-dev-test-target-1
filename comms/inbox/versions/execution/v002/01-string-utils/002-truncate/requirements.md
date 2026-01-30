# Requirements: truncate

## Objective
Implement a string truncation function with ellipsis.

## Functional Requirements

### FR-1: Function signature
```typescript
export function truncate(str: string, maxLength: number, suffix?: string): string
```

### FR-2: Behavior
- If string length <= maxLength, return original string
- If string length > maxLength, truncate and append suffix
- Default suffix is '...'
- maxLength includes the suffix length
- Throws if maxLength < suffix length

### FR-3: Location
- Create `src/string/truncate.ts`
- Export from `src/string/index.ts`

## Acceptance Criteria
- [ ] Function exists at src/string/truncate.ts
- [ ] Exported from src/index.ts
- [ ] Tests exist at tests/string/truncate.test.ts
- [ ] Handles edge cases (empty, short strings)
- [ ] All tests pass