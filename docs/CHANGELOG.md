# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v008] - 2026-03-08

### Added

- Trivial comment in `src/index.ts` to verify halt/recover orchestration workflow (PR #37)

### Changed

- N/A

### Fixed

- N/A

## [vsmoke01] - 2026-03-07

### Added

- Smoke test HTML comment (`<!-- smoke test vsmoke01 -->`) to README.md for pipeline validation (PR #36)

### Changed

- N/A

### Fixed

- N/A

## [v006] - 2026-03-06

### Added

- Promise utility module (`src/promise/`) with barrel exports
  - `sleep(ms: number): Promise<void>` -- promise-based delay that resolves after specified milliseconds
  - `retry<T>(fn: () => Promise<T>, attempts: number): Promise<T>` -- retry wrapper that retries a failed async function a specified number of times, preserving the last error
  - `timeout<T>(promise: Promise<T>, ms: number): Promise<T>` -- timeout wrapper using `Promise.race` with `.finally()` cleanup that rejects with `TimeoutError` if the promise does not resolve in time
- Function utility module (`src/function/`) with barrel exports
  - `once<T>(fn: (...args: any[]) => T): (...args: any[]) => T` -- single-execution wrapper that caches and returns the result of the first call
  - `debounce<T>(fn: (...args: any[]) => T, ms: number): (...args: any[]) => void` -- delays execution until after a specified time since the last call, using clearTimeout/setTimeout coalescing
  - `throttle<T>(fn: (...args: any[]) => T, ms: number): (...args: any[]) => void` -- limits function calls to once per specified time period with leading-edge execution
- `isNonNegative()` validation utility for non-negative number parameter validation
- `TimeoutError` error class extending `ValidationError` for timeout-specific error handling
- 61 new tests covering all promise and function utilities (285 total)

### Changed

- Extended validation module with `isNonNegative()` validator
- Extended error hierarchy with `TimeoutError`
- Updated `src/index.ts` to export the new promise and function modules

### Fixed

- N/A (new features, no bug fixes)

## [v005] - 2026-03-04

### Added

- Object utility module (`src/object/`) with barrel exports
  - `keys<T>(obj: T): (keyof T)[]` -- typed wrapper around `Object.keys()` returning `(keyof T)[]`
  - `pick<T, K>(obj: T, keys: K[]): Pick<T, K>` -- create new object with only specified properties
  - `omit<T, K>(obj: T, keys: K[]): Omit<T, K>` -- create new object excluding specified properties
  - `isEmpty(value: unknown): boolean` -- check if a value is empty across multiple types (null, undefined, empty string, empty array, empty plain object)
  - `get(obj: object, path: string, defaultValue?: unknown): unknown` -- safely retrieve nested properties via dot-path string with array index support
  - `clone<T>(obj: T): T` -- deep copy using native `structuredClone` with `ValidationError` for non-cloneable types
  - `merge(target: object, ...sources: object[]): object` -- deep merge multiple objects recursively with index-based array strategy
- `isPlainObject()` type guard in validation module for plain-object detection
- 92 new tests covering all object utilities and the new validator (224 total)

### Changed

- Extended validation module with `isPlainObject()` type guard and supporting tests
- Updated `src/index.ts` to export the new object module

### Fixed

- N/A (new features, no bug fixes)

## [v004] - 2026-02-06

### Added

- Array utility module (`src/array/`) with barrel exports
  - `first<T>(arr: T[]): T | undefined` — safe first element access with O(1) performance
  - `last<T>(arr: T[]): T | undefined` — safe last element access with O(1) performance
  - `unique<T>(arr: T[]): T[]` — array deduplication using Set with O(n) performance
  - `chunk<T>(arr: T[], size: number): T[][]` — split arrays into fixed-size chunks with validation
  - `compact<T>(arr: T[]): T[]` — remove all falsy values (false, null, 0, "", undefined, NaN)
  - `flatten(arr: any[], depth?: number): any[]` — flatten nested arrays with configurable depth (default 1, supports Infinity)
  - `intersection<T>(...arrays: T[][]): T[]` — find common elements across multiple arrays using strict equality
- `isNonNegativeInteger()` validation utility for non-negative integer parameter validation
- 60 new tests covering all array utilities and the new validator (131 total)

### Changed

- Extended validation module with `isNonNegativeInteger()` validator and supporting tests
- Updated `src/index.ts` to export the new array module

### Fixed

- N/A (new features, no bug fixes)

## [v003] - 2026-01-30

### Added

- Custom validation error class hierarchy with `ValidationError` base class
  - `EmptyStringError` for empty or whitespace-only string validation failures
  - `NegativeNumberError` for negative number validation failures
  - `OutOfRangeError` for range validation failures with automatic message generation
  - Optional `field` property on all validation errors for contextual information
- Validation utility functions with TypeScript type system integration
  - `isNonEmptyString()` type guard with `value is string` return type
  - `assertNonEmptyString()` assertion function with `asserts value is string`
  - `isPositiveNumber()` type guard that excludes Infinity and NaN
  - `assertPositiveNumber()` assertion function for positive number validation
  - `isInRange()` type guard for inclusive range validation
- Comprehensive test suites for validation utilities (45 new tests)
  - Edge case coverage for empty strings, whitespace, zero, negative numbers, Infinity, NaN
  - Boundary condition testing for range validation
  - Error message and property validation

### Changed

- Updated `truncate()` utility to use custom validation errors
  - Now throws `EmptyStringError` for empty/whitespace strings
  - Now throws `NegativeNumberError` for negative max length
  - Maintains backward compatibility for valid inputs
- Updated `clamp()` utility to use custom validation errors
  - Now throws `OutOfRangeError` when min > max
  - Maintains backward compatibility for valid inputs
- Updated `roundTo()` utility to use custom validation errors
  - Now throws `NegativeNumberError` for negative precision values
  - Maintains backward compatibility for valid inputs

### Fixed

- N/A (new features, no bug fixes)

## [v001] - 2026-01-30

### Added

- Node.js project initialization with `package.json` and npm scripts (build, test, lint)
- TypeScript configuration with ESM support (`tsconfig.json`)
  - Module system: NodeNext with modern ES2022 target
  - Strict type checking enabled
  - Source maps and declaration files
- Core application entry point at `src/index.ts`
- Jest testing framework with TypeScript ESM support
  - Configuration at `jest.config.js`
  - Sample test at `tests/index.test.ts`
  - ts-jest preset for TypeScript compilation
- GitHub Actions CI workflow at `.github/workflows/ci.yml`
  - Automated build verification
  - Automated test execution
  - Runs on push and pull requests
  - Node.js 20 with dependency caching
- Project documentation at `AGENTS.md`
  - Project overview and technology stack
  - Directory structure reference
  - Mandatory pull request workflow
  - Quality gates and commit format guidelines
  - auto-dev integration instructions

### Changed

- N/A (initial version)

### Fixed

- N/A (initial version)
