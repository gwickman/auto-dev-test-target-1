# Requirements: round-to

## Objective
Implement a function that rounds numbers to a specified number of decimal places.

## Functional Requirements

### FR-1: Function signature
```typescript
export function roundTo(value: number, decimals: number): number
```

### FR-2: Behavior
- Round value to specified decimal places
- decimals must be non-negative integer
- decimals = 0 rounds to integer
- Handles floating point precision issues

### FR-3: Location
- Create `src/number/roundTo.ts`
- Export from `src/number/index.ts`

## Acceptance Criteria
- [ ] Function exists at src/number/roundTo.ts
- [ ] Exported from src/index.ts
- [ ] Tests cover various decimal places
- [ ] Handles floating point edge cases
- [ ] All tests pass