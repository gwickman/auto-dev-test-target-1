# Open Questions for v004 Implementation

The following questions require user input before proceeding with implementation. These decisions will affect the detailed design documents and implementation approach.

---

## Question 1: Default Value Parameters for first() and last()

### Context

The backlog item descriptions for BL-020 (first) and BL-021 (last) state:
> "Should handle empty arrays safely and **optionally return a default value**."

However, the acceptance criteria specify:
- Function signature: `first<T>(arr: T[]): T | undefined`
- Function signature: `last<T>(arr: T[]): T | undefined`

These signatures do not include a default value parameter.

### The Question

**Should first() and last() support optional default value parameters?**

### Options

#### Option A: Simple signature without default (matches acceptance criteria)
```typescript
export function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}
```

**Usage:**
```typescript
const value = first(arr) ?? defaultValue; // User handles default at call site
```

**Pros:**
- Matches acceptance criteria exactly
- Simpler implementation
- Follows functional programming principle (separation of concerns)
- Consistent with TypeScript's optional chaining patterns

**Cons:**
- Users must handle defaults themselves
- Slightly more verbose at call sites

#### Option B: Enhanced signature with default parameter
```typescript
export function first<T>(arr: T[]): T | undefined;
export function first<T>(arr: T[], defaultValue: T): T;
export function first<T>(arr: T[], defaultValue?: T): T | undefined {
  return arr.length > 0 ? arr[0] : defaultValue;
}
```

**Usage:**
```typescript
const value = first(arr, defaultValue); // Built-in default handling
```

**Pros:**
- Matches description text
- Convenience for users
- More feature-complete

**Cons:**
- Doesn't match acceptance criteria signature
- More complex implementation (function overloads needed for type safety)
- Increases testing scope

### Recommendation

**Option A** - Keep the simple signature matching acceptance criteria.

**Rationale:**
1. Acceptance criteria are the authoritative source for requirements
2. Modern JavaScript/TypeScript has excellent support for defaults via nullish coalescing (`??`)
3. Simpler implementation reduces risk
4. v003 established pattern of focusing on core functionality
5. Users can easily add default handling: `first(arr) ?? defaultValue`

### Decision Needed

Please confirm which approach to implement before starting Theme 01.

**If Option A:** Proceed with simple signatures as specified in acceptance criteria.
**If Option B:** Update acceptance criteria in backlog to reflect enhanced signatures before implementation.

---

## Question 2: Runtime Array Type Validation

### Context

The research identified that array utilities could validate that input parameters are actually arrays at runtime, but the existing codebase pattern (v001-v003) does not validate TypeScript-typed parameters.

**Examples from existing code:**
- `capitalize(str: string)` - Trusts TypeScript, no runtime check for typeof string
- `clamp(value: number, ...)` - Trusts TypeScript, no runtime check for typeof number
- `truncate(str: string, maxLength: number)` - Validates maxLength **value** (positive integer), not **type**

The pattern is: **Trust TypeScript types, validate parameter values only when needed.**

### The Question

**Should array utilities validate that parameters are actually arrays at runtime?**

### Options

#### Option A: Trust TypeScript types (matches existing pattern)
```typescript
export function unique<T>(arr: T[]): T[] {
  // No runtime type check
  return [...new Set(arr)];
}

export function chunk<T>(arr: T[], size: number): T[][] {
  // Validate size VALUE (positive integer) but not arr TYPE
  if (!Number.isInteger(size) || size <= 0) {
    throw new InvalidNumberError('size must be a positive integer', 'size');
  }
  // Implementation...
}
```

**Pros:**
- Consistent with v001-v003 patterns
- Simpler implementation
- Leverages TypeScript's compile-time type safety
- Reduces runtime overhead
- Matches how existing utilities work

**Cons:**
- No runtime safety if called from JavaScript or with type assertions
- Less defensive programming

#### Option B: Add runtime array type validation
```typescript
// Create new validator
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

// Use in functions
export function unique<T>(arr: T[]): T[] {
  if (!isArray(arr)) {
    throw new ValidationError('Expected an array', 'arr');
  }
  return [...new Set(arr)];
}
```

**Pros:**
- Defensive programming
- Catches misuse from JavaScript
- More explicit error messages

**Cons:**
- Inconsistent with existing codebase patterns
- Adds validation overhead to every function call
- Duplicate type checking (TypeScript + runtime)
- Would need to retroactively add to v001-v003 for consistency

#### Option C: Document-only approach
Keep Option A implementation, but add JSDoc comment:
```typescript
/**
 * Returns unique elements from an array.
 * @param arr - Array to process. Must be an array.
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}
```

### Recommendation

**Option A** - Trust TypeScript types without runtime array validation.

**Rationale:**
1. Maintains consistency with 100% of existing utilities (v001-v003)
2. TypeScript's type system is designed to catch type errors at compile time
3. Existing codebase has proven this pattern works well (zero issues in v003)
4. The research document shows Option A was already recommended: "Trust TypeScript types. Existing utilities don't validate typed parameters. Only validate parameter values (size, depth), not types."
5. Adding runtime type checks now would make v004 inconsistent with v001-v003

**Validation strategy for v004:**
- **Trust TypeScript for types:** arr, arrays, value types
- **Validate parameter values:** size (positive integer), depth (non-negative integer)
- **Follow v003 pattern:** Like `truncate()` validates maxLength value but trusts str type

### Decision Needed

Please confirm which approach to implement.

**If Option A:** Proceed without runtime array type validation (recommended).
**If Option B:** Create `isArray()` validator and add to all array utility functions.
**If Option C:** Add JSDoc documentation noting array requirement.

---

## Question 3: Test Coverage Reporting

### Context

The impact analysis mentioned: "Check test coverage (if coverage tool configured)" but it's unclear if a test coverage tool (like Jest's built-in coverage) is configured or desired for v004.

**Current state:**
- v003 achieved 100% acceptance criteria and quality gate success without coverage tooling
- No coverage reports found in repository
- jest.config.js does not include coverage configuration
- No coverage badges or reports in documentation

### The Question

**Should test coverage reporting be configured before or during v004 implementation?**

### Options

#### Option A: Configure Jest coverage for v004
Add to jest.config.js:
```javascript
coverageDirectory: './coverage',
collectCoverageFrom: ['src/**/*.ts'],
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80
  }
}
```

Run with: `npm test -- --coverage`

**Pros:**
- Quantifiable metrics for test completeness
- Identifies untested code paths
- Industry best practice

**Cons:**
- Additional setup and configuration time
- May slow down test runs slightly
- v003 succeeded without it

#### Option B: Skip coverage tooling for v004, rely on comprehensive test writing
Continue v003 approach:
- Write comprehensive tests covering all scenarios
- Follow test strategy checklist
- Use acceptance criteria as completeness measure

**Pros:**
- No setup time needed
- Proven approach (v003 was successful)
- Can add coverage later as infrastructure improvement

**Cons:**
- Less quantifiable metrics
- Must trust test strategy adherence

#### Option C: Configure after v004 completes
Implement v004 without coverage, then add coverage tooling as a post-v004 improvement:
- v004 follows v003 successful pattern
- After v004 merges, configure coverage
- Run coverage reports on entire codebase (v001-v004)
- Identify gaps and add tests if needed

**Pros:**
- Doesn't block v004 progress
- Can establish baseline coverage across all versions
- Retroactive improvement

**Cons:**
- Coverage not available during v004 development

### Recommendation

**Option B** for v004 implementation - Skip coverage tooling, rely on comprehensive test writing.

**Rationale:**
1. v003 achieved 100% success without coverage tooling
2. The test strategy document provides comprehensive checklist (equivalent to coverage)
3. Focus implementation effort on features, not infrastructure
4. Can add coverage as infrastructure improvement later (Option C)
5. 52-66 new tests planned - comprehensive by design

**Future consideration:** After v004 completes successfully, evaluate adding coverage tooling for v005+ as a quality infrastructure improvement.

### Decision Needed

Please confirm approach to test coverage.

**If Option A:** Configure coverage before starting implementation (will add to setup tasks).
**If Option B:** Proceed without coverage, rely on test strategy document (recommended).
**If Option C:** Plan to add coverage after v004 as infrastructure improvement.

---

## Summary of Decisions Required

| Question | Default Recommendation | Blocking? |
|----------|----------------------|-----------|
| 1. Default value parameters | Option A: Simple signature | Yes - affects Theme 01 implementation |
| 2. Runtime array validation | Option A: Trust TypeScript | Yes - affects all features |
| 3. Test coverage reporting | Option B: Skip for v004 | No - can proceed either way |

### Next Steps

After receiving user input on these questions:

1. **Update backlog items** (if needed) - If decisions differ from acceptance criteria
2. **Proceed to detailed design** (Tasks 005-006) - Create VERSION_DESIGN.md, theme designs, feature requirements
3. **Begin implementation** - Execute features following approved design

### How to Respond

Please indicate your decision for each question:
- Question 1: A or B?
- Question 2: A, B, or C?
- Question 3: A, B, or C?

Example response:
```
Question 1: A (simple signature)
Question 2: A (trust TypeScript)
Question 3: B (skip coverage for now)
```

Or provide alternative guidance if none of the options match your preference.
