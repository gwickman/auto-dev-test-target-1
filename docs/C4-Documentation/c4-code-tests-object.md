# C4 Code Level: Object Module Tests

## Overview

- **Name**: Object Module Test Suite
- **Description**: Comprehensive test suite for object utility functions including deep cloning, nested property access, emptiness checks, property selection, and object merging.
- **Location**: tests/object
- **Language**: TypeScript (Jest with @jest/globals)
- **Purpose**: Ensures correctness and reliability of all object manipulation utilities through extensive test coverage including edge cases and error conditions.
- **Parent Component**: [Test Suite](./c4-component-test-suite.md)

## Test Structure

### Test Files and Coverage

| Test File | Test Count | Coverage |
|-----------|-----------|----------|
| clone.test.ts | 15 | clone() function - 15 tests |
| get.test.ts | 15 | get() function - 15 tests |
| isEmpty.test.ts | 16 | isEmpty() function - 16 tests |
| keys.test.ts | 6 | keys() function - 6 tests |
| merge.test.ts | 17 | merge() function - 17 tests |
| omit.test.ts | 17 | omit() function - 17 tests |
| pick.test.ts | 9 | pick() function - 9 tests |
| **Total** | **95** | All object utilities |

Test counts verified by execution: `npm test` confirms 95 passing tests in tests/object/

### Test File Inventory

#### clone.test.ts (15 tests)
Tests deep cloning functionality including:
- Simple object cloning and mutation isolation
- Nested object deep copying
- Arrays within objects
- Date and RegExp object preservation
- Circular reference handling
- ValidationError throwing for functions and symbols
- Null and undefined property handling
- Empty object cloning
- Direct array cloning
- Primitive value cloning
- End-to-end integration testing

#### get.test.ts (15 tests)
Tests nested property retrieval with dot-notation including:
- Top-level property access
- Deep nesting (a.b.c)
- Array element access by index
- Nested property through array elements
- Missing property handling (undefined returns)
- Null/undefined intermediate value handling
- Default value fallback behavior
- Empty path string handling
- Consecutive and trailing dot edge cases
- Various value types at leaf positions
- End-to-end package root import testing

#### isEmpty.test.ts (16 tests)
Tests emptiness detection including:
- Null and undefined values
- Empty strings, arrays, and objects
- Non-empty variants
- Zero, false, and NaN values (not empty)
- Non-empty strings, arrays, and objects
- Date, RegExp, Map, Set instances (not empty)
- Nested empty objects with own properties
- Plain objects vs inherited properties
- Mixed content in objects and arrays
- Various edge cases with object prototypes

#### keys.test.ts (6 tests)
Tests type-safe key extraction including:
- Basic key extraction
- Type preservation
- Empty object handling
- Multiple key scenarios
- Key order consistency

#### merge.test.ts (17 tests)
Tests deep recursive merging including:
- Single source merge
- Multiple source merge
- Nested object recursive merging
- Array index-based overwriting
- Primitive value overwriting
- Null and undefined source skipping
- Plain object detection in recursive descent
- Type preservation through merge
- Empty object and array handling
- Mixed type value merging
- Complex nested structures
- Source order precedence
- Circular reference warnings (documented)

#### omit.test.ts (17 tests)
Tests property exclusion including:
- Single property exclusion
- Multiple property exclusion
- Missing property graceful handling
- Type inference with literal arrays
- Empty exclusion list
- Non-existent keys in exclusion list
- Shallow copy behavior verification
- Various key scenarios
- Type safety verification

#### pick.test.ts (9 tests)
Tests property selection including:
- Single property selection
- Multiple property selection
- Type inference with literal arrays
- Empty selection list handling
- Non-existent keys in selection
- Shallow copy behavior verification
- Property order preservation
- Missing properties handling

## Dependencies

### Internal Dependencies

- `src/object/` - All object utility functions being tested
- `src/errors/` - ValidationError, EmptyStringError, InvalidNumberError
- `src/validation/` - isPlainObject for merge testing

### External Dependencies

- `@jest/globals` - describe, expect, it, and other Jest testing utilities
- `node:test` assertions and behaviors

## Test Coverage Summary

**Coverage by source function:**
- `clone()` - 15 tests (deep copy, error handling, circular refs, type preservation)
- `get()` - 15 tests (path parsing, default values, edge cases, type narrowing)
- `isEmpty()` - 16 tests (all falsy patterns, type-specific behavior)
- `keys()` - 6 tests (key extraction, type preservation)
- `merge()` - 17 tests (recursive merging, array handling, source precedence)
- `omit()` - 17 tests (property exclusion, type inference)
- `pick()` - 9 tests (property selection, type inference)

**Test execution status:** All 95 tests passing as of last verification

## Notes

- Tests use consistent naming conventions describing the test behavior
- Comprehensive edge case coverage including null, undefined, empty collections
- Error testing verifies correct exception types and messages
- Type safety testing with TypeScript ensures signature compliance
- Integration tests verify end-to-end functionality from package root imports
- Test file structure mirrors source file structure for maintainability
