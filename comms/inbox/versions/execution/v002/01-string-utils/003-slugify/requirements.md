# Requirements: slugify

## Objective
Implement a function that converts strings to URL-safe slugs.

## Functional Requirements

### FR-1: Function signature
```typescript
export function slugify(str: string): string
```

### FR-2: Behavior
- Convert to lowercase
- Replace spaces with hyphens
- Remove non-alphanumeric characters (except hyphens)
- Collapse multiple hyphens into one
- Trim leading/trailing hyphens

### FR-3: Location
- Create `src/string/slugify.ts`
- Export from `src/string/index.ts`

## Acceptance Criteria
- [ ] Function exists at src/string/slugify.ts
- [ ] Exported from src/index.ts
- [ ] Tests cover various inputs
- [ ] All tests pass