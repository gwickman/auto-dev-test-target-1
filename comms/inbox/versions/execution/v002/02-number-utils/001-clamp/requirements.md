# Requirements: clamp

## Objective
Implement a number clamping function.

## Functional Requirements

### FR-1: Function signature
```typescript
export function clamp(value: number, min: number, max: number): number
```

### FR-2: Behavior
- If value < min, return min
- If value > max, return max
- Otherwise return value
- Throws if min > max

### FR-3: Location
- Create `src/number/clamp.ts`
- Create `src/number/index.ts` barrel export
- Re-export from `src/index.ts`

## Acceptance Criteria
- [ ] Function exists at src/number/clamp.ts
- [ ] Exported from src/index.ts
- [ ] Tests exist at tests/number/clamp.test.ts
- [ ] All tests pass
- [ ] `npm run build` succeeds