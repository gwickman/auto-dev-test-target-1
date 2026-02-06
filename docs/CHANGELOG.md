# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
