# Logical Design Proposal for v004

**Version:** v004 - Array Utilities
**Status:** Proposed for Review
**Date:** 2026-02-05

This logical design proposes **2 themes** with **7 features total** for implementing array utility functions in the auto-dev-test-target-1 TypeScript library.

## Theme Overview

### Theme 01: array-basics (4 features)
**Goal:** Implement foundational array utility functions that provide safe, type-safe access and transformation operations for arrays. This theme focuses on commonly-needed utilities with straightforward implementations: accessing first/last elements safely, removing duplicates, and splitting arrays into chunks.

**Features:**
- **001-first** - Safe access to first array element
- **002-last** - Safe access to last array element
- **003-unique** - Remove duplicate values using Set
- **004-chunk** - Split arrays into fixed-size chunks

### Theme 02: array-advanced (3 features)
**Goal:** Implement advanced array transformation utilities that handle complex operations like filtering, flattening nested structures, and finding common elements across multiple arrays. These utilities build upon JavaScript Set operations and recursive algorithms for more sophisticated array manipulation.

**Features:**
- **005-compact** - Remove all falsy values from arrays
- **006-flatten** - Flatten nested arrays with depth control
- **007-intersection** - Find common elements across multiple arrays

## Key Decisions

### 1. Theme Grouping Rationale
**Theme 01 (array-basics)** contains simple utilities with minimal complexity:
- `first()` and `last()` are trivial array access functions
- `unique()` leverages Set for simple deduplication
- `chunk()` uses straightforward slicing logic

**Theme 02 (array-advanced)** contains more complex operations:
- `compact()` requires type narrowing considerations
- `flatten()` involves recursive depth handling with Infinity support
- `intersection()` combines Set operations with variadic parameters

This grouping allows executing simpler features first to establish patterns, then progressing to more complex implementations.

### 2. Feature Execution Order
**Within Theme 01:**
Order: first() → last() → unique() → chunk()
- Start with simplest (direct array access)
- Progress to Set operations (unique)
- Complete with more complex chunking logic

**Within Theme 02:**
Order: compact() → flatten() → intersection()
- Begin with straightforward filtering (compact)
- Move to recursive complexity (flatten)
- Finish with combined operations (intersection)

### 3. Validation Strategy
**New validators required in src/validation/index.ts:**
- `isArray(value: unknown): value is unknown[]` - Array type guard
- `isNonNegativeInteger(value: unknown): value is number` - For flatten() depth validation

**Reuse existing validators:**
- `isPositiveNumber()` combined with `Number.isInteger()` check for chunk() size
- `OutOfRangeError` for invalid parameters
- `InvalidNumberError` for type violations

### 4. Implementation Patterns Selected
Based on Task 003 research, selected industry-standard approaches:
- **unique()**: Set conversion with spread operator (`[...new Set(arr)]`)
- **chunk()**: For-loop with slice (most readable)
- **first/last()**: Direct array access returning `T | undefined`
- **flatten()**: Recursive reduce with depth parameter
- **compact()**: `filter(Boolean)` with type assertion (TypeScript limitation)
- **intersection()**: Set-based filter with `every()` check

### 5. Type Strategy
All functions use generic type parameter `<T>` except `flatten()`:
- **Generic functions**: Preserve input array type (unique, chunk, first, last, compact, intersection)
- **Exception**: `flatten(arr: any[], depth?: number): any[]` - Uses `any[]` due to TypeScript's inability to type nested arrays of arbitrary depth

## Dependencies

### Theme Dependencies
- **Theme 02 depends on Theme 01**: Not strictly, but Theme 01 establishes patterns
- **Both themes depend on v003**: All features require v003 validation infrastructure

### Feature Dependencies
**Within themes:** No strict dependencies, but ordered by complexity
**Cross-theme:** None - features are independent
**External:** All features integrate with v003 ValidationError types

### Execution Order Rationale
1. **Theme 01 first**: Establishes array utility patterns, simpler to implement
2. **Theme 02 second**: Builds confidence from Theme 01 success, tackles complexity
3. **Sequential within themes**: Complexity-based ordering minimizes risk

## Open Questions

### 1. Default Value Parameters for first() and last()
**Context:** Backlog descriptions mention "optionally return a default value" but acceptance criteria specify `T | undefined` return type.

**Question:** Should first() and last() support optional default value parameters?

**Options:**
- A) Keep simple signature: `first<T>(arr: T[]): T | undefined` (matches acceptance criteria)
- B) Add default parameter: `first<T>(arr: T[], defaultValue?: T): T` (matches description)

**Recommendation:** Option A - Matches acceptance criteria exactly. Users can handle defaults at call site: `first(arr) ?? defaultValue`

**Decision needed:** Before implementing Theme 01, confirm which approach to use.

### 2. Array Validation for Input Parameters
**Context:** Research identified need for array type validation, but existing utilities don't validate TypeScript-typed parameters.

**Question:** Should array utilities validate that parameters are actually arrays at runtime?

**Options:**
- A) Trust TypeScript types, no runtime validation (matches existing pattern for capitalize, clamp, etc.)
- B) Add runtime array validation using new `isArray()` validator
- C) Validate only for public API entry points

**Recommendation:** Option A - Trust TypeScript types. Existing utilities (v001-v003) don't validate typed parameters. Only validate parameter values (size, depth), not types.

**Decision needed:** Before starting implementation, confirm validation approach.

### 3. Test Coverage Tool Configuration
**Context:** Impact analysis mentions "Check test coverage (if coverage tool configured)" but coverage tool presence is uncertain.

**Question:** Should test coverage reporting be configured before/during v004?

**Options:**
- A) Configure Jest coverage reporting for v004 features
- B) Skip coverage tooling, rely on comprehensive test writing
- C) Configure after v004 completes

**Recommendation:** Option B for v004 - v003 achieved 100% success without coverage tooling. Can add later as infrastructure improvement.

**Decision needed:** Not blocking, but good to confirm expectations.

## Next Steps

After user review and approval of this logical design:

1. **Design document creation** (Tasks 005-006):
   - VERSION_DESIGN.md
   - THEME_INDEX.md
   - STARTER_PROMPT.md
   - Individual theme design documents
   - Feature requirements and implementation plans

2. **Critical thinking validation** (Task 007):
   - Review for logical consistency
   - Identify potential issues
   - Validate against project constraints

3. **Execution phase**:
   - Implement features following approved design
   - Follow PR workflow per AGENTS.md
   - Achieve quality gate targets from v003

## Design Readiness

**Status: READY FOR REVIEW**

✅ All backlog items accounted for (7 features from BL-018 through BL-024)
✅ Research complete with implementation patterns selected
✅ Dependencies identified and documented
✅ Test strategy defined
✅ Integration points with v003 clear
✅ Open questions documented for user input

This design is ready for user approval to proceed with detailed design document generation.
