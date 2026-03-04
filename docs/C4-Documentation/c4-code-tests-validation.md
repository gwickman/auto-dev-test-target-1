# C4 Code Level: Validation Module Tests

## Overview

- **Name**: Validation Module Test Suite
- **Description**: Comprehensive test suite for validation type guards and assertion functions covering type predicates, range validation, and plain object detection.
- **Location**: tests/validation
- **Language**: TypeScript (Jest with @jest/globals)
- **Purpose**: Ensures correctness and reliability of validation utilities through extensive testing of type guards, assertions, and edge cases across all supported types.
- **Parent Component**: [Test Suite](./c4-component-test-suite.md)

## Test Structure

### Test Files and Coverage

| Test File | Test Count | Coverage |
|-----------|-----------|----------|
| index.test.ts | 31 | All validation utilities - 31 tests |
| **Total** | **31** | All validation functions |

Test counts verified by execution: `npm test` confirms 31 passing tests in tests/validation/

### Test File Inventory

#### index.test.ts (31 tests)
Comprehensive test suite covering all validation functions including:

**isNonEmptyString tests (4 tests):**
- Returns true for non-empty strings
- Returns false for empty strings
- Returns false for non-string values (numbers, objects, null, undefined)
- Type guard assertion in conditional branches

**isPositiveNumber tests (5 tests):**
- Returns true for positive integers
- Returns true for positive decimals
- Returns false for zero and negative numbers
- Returns false for non-numeric values (strings, objects, null)
- Returns false for Infinity and NaN

**isInRange tests (4 tests):**
- Returns true for values within range (inclusive boundaries)
- Returns false for values below range
- Returns false for values above range
- Boundary conditions at min and max

**isNonNegativeInteger tests (5 tests):**
- Returns true for positive integers
- Returns true for zero
- Returns false for negative integers
- Returns false for decimal numbers
- Returns false for non-numeric values

**assertNonEmptyString tests (3 tests):**
- Passes through without error for non-empty strings
- Throws EmptyStringError for empty strings
- Throws EmptyStringError for non-string values
- Includes field name in error when provided
- Type assertion narrows type in calling code

**isPlainObject tests (10 tests):**
- Returns true for plain objects (object literals)
- Returns true for objects with null prototype
- Returns false for null
- Returns false for arrays
- Returns false for Date objects
- Returns false for RegExp objects
- Returns false for Map instances
- Returns false for Set instances
- Returns false for functions
- Returns false for primitives (string, number, boolean)
- Distinguishes plain objects from custom class instances

**Integration tests (2 tests):**
- Multiple validation functions used together in validation pipelines
- Real-world validation scenarios combining type guards and assertions

## Dependencies

### Internal Dependencies

- `src/validation/` - All validation utility functions being tested
- `src/errors/` - EmptyStringError used by assertNonEmptyString

### External Dependencies

- `@jest/globals` - describe, expect, it, and other Jest testing utilities

## Test Coverage Summary

**Coverage by source function:**
- `isNonEmptyString()` - 4 tests (true cases, false cases, type guard behavior)
- `isPositiveNumber()` - 5 tests (positive/zero/negative, Infinity, NaN, non-numeric)
- `isInRange()` - 4 tests (within range, below, above, boundaries)
- `isNonNegativeInteger()` - 5 tests (positive, zero, negative, decimals, non-numeric)
- `assertNonEmptyString()` - 3 tests (pass-through, error cases, type assertion)
- `isPlainObject()` - 10 tests (true cases, false cases, prototype chain handling)
- Integration/end-to-end - 2 tests (multi-function validation chains)

**Test execution status:** All 31 tests passing as of last verification

## Notes

- Tests comprehensively cover all parameter combinations and edge cases
- Type guard behavior is tested to ensure proper TypeScript type narrowing
- Assertion function tests verify error throwing and type assertion semantics
- Plain object detection tests distinguish between various object-like types
- Test structure mirrors source function organization for maintainability
- Tests verify both positive cases (returns true) and negative cases (returns false)
- Error message verification ensures descriptive feedback for validation failures
