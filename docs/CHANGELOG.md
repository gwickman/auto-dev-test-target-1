# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v002] - 2026-01-30

### Added

- String utility module at `src/string/` with barrel exports
  - `reverse()` - Reverses a string with proper unicode character handling
  - `truncate()` - Truncates strings to maximum length with configurable suffix
  - `slugify()` - Converts strings to URL-safe slugs with normalization
- Number utility module at `src/number/` with barrel exports
  - `clamp()` - Constrains a number to a specified range
  - `roundTo()` - Rounds a number to specified decimal places
- Comprehensive test suites for string utilities (14 tests)
- Comprehensive test suites for number utilities (12 tests)
- Module barrel exports at `src/string/index.ts` and `src/number/index.ts`
- Top-level public API exports in `src/index.ts`

### Changed

- N/A (no changes to existing functionality)

### Fixed

- N/A (no bug fixes in this version)

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
