# v004 Logical Design - Risks and Unknowns

## Technologies/Libraries Requiring Research

### 1. TypeScript Generic Array Patterns
**Question**: What's the best practice for preserving array element types through transformations?

**Why**: Functions like unique(), chunk(), first(), last() need to maintain type safety

**Examples to research**:
- Generic type preservation through Set operations
- Return type inference for array methods
- Union type handling (T | undefined for first/last)

### 2. TypeScript Type Guards with Arrays
**Question**: How to implement type guards that work with array element types?

**Why**: Acceptance criteria require "uses type guards" for first() and last()

**Research needed**:
- Type guard patterns for array access
- Combining with undefined handling
- User-defined type guards vs assertion functions

### 3. Array.prototype.flat() vs Custom Implementation
**Question**: Should flatten() use native Array.flat() or custom recursive implementation?

**Why**: Need to support depth parameter and Infinity, understand browser compatibility

**Research needed**:
- Native flat() availability and behavior
- Performance comparison
- Edge case handling differences

## Unclear Areas of Existing Codebase

### 1. Validation Utilities Location
**Question**: Where should new isNonNegativeInteger() validator be added?

**Current state**: v003 created src/validation/index.ts with validators

**Need to verify**:
- File structure: `src/validation/index.ts`
- Export pattern
- Test file location: `tests/validation/index.test.ts`
- Integration with existing validators

### 2. Error Type Usage Pattern
**Question**: Which validation error types are appropriate for array utilities?

**Current state**: v003 created error hierarchy (ValidationError, EmptyStringError, NegativeNumberError, OutOfRangeError)

**Need to verify**:
- When to use NegativeNumberError vs OutOfRangeError
- Whether to create new array-specific errors
- Error message conventions
- Field property usage

### 3. ESM Import Path Conventions
**Question**: Confirm .js extension usage in imports within TypeScript files

**Current state**: v003 used `.js` extensions in imports (ESM requirement)

**Need to verify**:
- Consistent pattern across existing utilities
- Import paths for validation and errors
- Relative import syntax

### 4. Test Coverage Patterns
**Question**: What test coverage level is expected for array utilities?

**Current state**: v003 added 45 tests, grew from 39 to 60 total

**Need to verify**:
- Test organization (one file per function vs grouped)
- Edge case coverage expectations
- Performance test requirements
- Type checking in tests

## Potential Impacts to Testing Fixtures/Harnesses

### 1. Jest Configuration for Array Tests
**Risk**: Large array tests might hit memory limits or timeouts

**Considerations**:
- Test arrays of various sizes
- Nested arrays for flatten()
- Performance test timeouts
- Memory usage with large datasets

### 2. TypeScript Test Type Checking
**Risk**: Generic types in tests might require special handling

**Considerations**:
- Type assertions in test expectations
- Generic type inference in tests
- Testing with various type parameters

### 3. New Test Data Fixtures
**Risk**: May need fixture data for complex test scenarios

**Considerations**:
- Nested array structures for flatten()
- Large arrays for performance tests
- Object/reference data for intersection()
- Edge case data (NaN, undefined, null)

## Integration Risks with Existing Systems

### 1. Main Index Export
**Risk**: Adding new array module to src/index.ts barrel export

**Current state**: Exports string, number, validation, errors modules

**Need to verify**:
- Export pattern: `export * from './array/index.js'`
- Module organization
- Potential naming conflicts

### 2. Validation Module Integration
**Risk**: Adding new validator affects existing code

**Current state**: v003 created isNonEmptyString, isPositiveNumber, isInRange

**Need to verify**:
- Whether to add isNonNegativeInteger to validation module
- Export updates needed
- Test file updates
- Breaking changes?

### 3. Package.json Scripts
**Risk**: No new scripts needed, but confirm build/test work with new code

**Need to verify**:
- `npm run build` compiles new TypeScript
- `npm test` discovers new test files
- No configuration changes needed

## Other Blockers or Concerns

### 1. Deferred Feature: Default Values
**Concern**: BL-020/BL-021 descriptions mention "optionally return a default value" but acceptance criteria don't include it

**Impact**: Should we implement this feature or truly defer it?

**Resolution needed**:
- Confirm acceptance criteria are authoritative
- Document why default values deferred
- Plan for potential future addition

### 2. Type Safety Trade-off in flatten()
**Concern**: Using any[] in flatten() signature sacrifices type safety

**Impact**: Less TypeScript protection, runtime errors possible

**Questions**:
- Is this acceptable for a utility library?
- Should we document this limitation?
- Are there alternative approaches with better types?

### 3. Set Behavior with Object References
**Concern**: unique() and intersection() use Set, which uses reference equality for objects

**Impact**: `[{a:1}, {a:1}]` stays as-is (not deduplicated)

**Questions**:
- Is this the expected behavior?
- Should we document this clearly?
- Do acceptance criteria require deep equality?

### 4. NaN Handling in Set Operations
**Concern**: Set treats NaN as equal to NaN (unlike ===)

**Impact**: unique([NaN, NaN]) returns [NaN], not [NaN, NaN]

**Questions**:
- Is this desirable behavior?
- Needs comprehensive test coverage
- Should be documented

### 5. Performance Considerations
**Concern**: No performance acceptance criteria, but large arrays could be slow

**Questions**:
- Should we test with large datasets?
- Are there performance targets?
- When to optimize vs ship standard implementation?

### 6. Empty Array Handling Consistency
**Concern**: Different functions handle empty arrays differently

**Examples**:
- first([]) → undefined
- last([]) → undefined
- unique([]) → []
- chunk([], 3) → []
- compact([]) → []

**Questions**:
- Is this consistent enough?
- Should we document empty array behavior?

### 7. CI Pipeline Capacity
**Concern**: Adding 126+ new tests increases CI runtime

**Impact**: Longer PR feedback cycle

**Questions**:
- Current CI performance
- Test parallelization options
- Timeout adjustments needed?

## Summary of Investigation Priorities

**High Priority** (blocking implementation):
1. TypeScript generic patterns for arrays
2. Validation utilities integration (isNonNegativeInteger)
3. Existing error type usage patterns
4. ESM import conventions

**Medium Priority** (affects quality):
1. Test coverage patterns and expectations
2. Type guard implementation approaches
3. flatten() implementation strategy (native vs custom)
4. Set behavior documentation needs

**Low Priority** (nice to have):
1. Performance test requirements
2. CI pipeline capacity
3. Default value feature clarification
