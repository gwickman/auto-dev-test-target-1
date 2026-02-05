# Current Project Capabilities

## Project Structure

```
auto-dev-test-target-1/
├── src/                      # Source code (TypeScript)
│   ├── string/              # String utilities (4 functions)
│   ├── number/              # Number utilities (2 functions)
│   ├── errors/              # Custom error classes
│   ├── validation/          # Validation utilities
│   └── index.ts             # Main entry point
├── tests/                   # Test suites (Jest)
│   ├── string/              # String utility tests
│   ├── number/              # Number utility tests
│   ├── errors/              # Error class tests
│   └── validation/          # Validation tests
├── docs/                    # Documentation
│   ├── versions/            # Version-specific docs (v001-v003)
│   ├── auto-dev/            # Auto-dev framework docs
│   └── CHANGELOG.md         # Change history
├── comms/                   # Auto-dev communication
│   ├── inbox/               # Design documents
│   └── outbox/              # Completion reports
├── .github/workflows/       # GitHub Actions CI
└── dist/                    # Compiled output (gitignored)
```

## Technology Stack

**Language & Runtime:**
- TypeScript 5.x with strict mode enabled
- Node.js 20.x with ESM modules
- Target: ES2022

**Testing:**
- Jest 30.2.0 with ts-jest
- Full test coverage for all utilities
- 9 test suites with edge case coverage

**Build & Quality:**
- TypeScript compiler (tsc)
- GitHub Actions CI (build + test on push/PR)
- Conventional commit format
- Quality gates: npm run build, npm test

**Auto-Dev Integration:**
- MCP server integration for orchestrated development
- Structured design → implementation → retrospective workflow
- Communication through comms/ directory
- Process documentation in docs/auto-dev/PROCESS/

## Implemented Features

### String Utilities (src/string/)

1. **reverse(str: string): string**
   - Reverses a string using spread and array reverse
   - File: src/string/reverse.ts

2. **truncate(str: string, maxLength: number): string**
   - Truncates string with "..." ellipsis
   - Validates non-empty string and positive maxLength
   - Throws EmptyStringError, NegativeNumberError
   - File: src/string/truncate.ts

3. **slugify(str: string): string**
   - Converts string to URL-friendly slug
   - Lowercase, spaces to hyphens, removes special chars
   - File: src/string/slugify.ts

4. **capitalize(str: string): string**
   - Capitalizes first character, lowercases rest
   - Handles empty strings gracefully
   - File: src/string/capitalize.ts

### Number Utilities (src/number/)

1. **clamp(value: number, min: number, max: number): number**
   - Constrains value to [min, max] range
   - Validates min <= max
   - Throws OutOfRangeError if min > max
   - File: src/number/clamp.ts

2. **roundTo(value: number, precision: number): number**
   - Rounds to specified decimal places
   - Validates non-negative precision
   - Throws NegativeNumberError for negative precision
   - File: src/number/roundTo.ts

### Error Types (src/errors/)

Custom error class hierarchy:

- **ValidationError** (base class)
  - optional `field` property for context
- **EmptyStringError** extends ValidationError
  - For empty or whitespace-only strings
- **NegativeNumberError** extends ValidationError
  - For negative number validation failures
- **OutOfRangeError** extends ValidationError
  - For range validation failures
  - Automatic message generation with actual/expected/field

File: src/errors/index.ts

### Validation Utilities (src/validation/)

1. **Type Guards:**
   - isNonEmptyString(value: unknown): value is string
   - isPositiveNumber(value: unknown): value is number
   - isInRange(value: number, min: number, max: number): boolean

2. **Assertions:**
   - assertNonEmptyString(value: unknown, field?: string): asserts value is string

File: src/validation/index.ts

## Key Patterns & Approaches

### TypeScript Integration
- Type guards with `value is Type` return types
- Assertion functions with `asserts value is Type`
- ESM imports with .js extensions
- Strict type checking enabled

### Error Handling
- Custom error classes for specific validation failures
- Optional field context on all validation errors
- Informative error messages
- Maintains backward compatibility for valid inputs

### Testing Strategy
- One test file per source file
- Edge case coverage (empty, whitespace, zero, negative, Infinity, NaN)
- Boundary condition testing
- Error message validation
- Property validation on error objects

### Auto-Dev Workflow
- Design documents in comms/inbox/versions/execution/
- Completion reports in comms/outbox/versions/execution/
- Retrospectives in docs/versions/
- VERSION_DESIGN.md, THEME_INDEX.md, STARTER_PROMPT.md per version

### CI/CD
- GitHub Actions workflow at .github/workflows/ci.yml
- Runs on push and pull requests
- Node.js 20 with dependency caching
- Automated build and test verification

## Documentation

### Auto-Dev Documentation (docs/auto-dev/)

- **README.md** - Framework overview
- **ROADMAP.md** - Version planning (currently empty)
- **BACKLOG.md** - 17 work items (mostly MCP logging improvements)
- **LEARNINGS.md** - Index of learning documents
- **STANDARDS.md** - Development standards
- **SYNC.md** - Template synchronization status

### Process Documentation (docs/auto-dev/PROCESS/)

**Generic process:**
- 01-VERSION-SCOPING.md
- 02-REQUIREMENTS.md
- 03-IMPLEMENTATION-PLAN.md
- 04-STARTER-PROMPT.md
- 05-IMPLEMENTATION.md
- 06-RETROSPECTIVE.md
- 07-VERSION-CLOSE.md

**Library modules:**
- ci-github-actions.md
- typescript-testing.md

**Checklists:**
- api-parity.md
- config-parsing.md
- state-isolation.md

### Project Documentation

- **README.md** - Basic project overview (3 lines)
- **AGENTS.md** - Comprehensive agent instructions (137 lines)
  - PR workflow with CI handling
  - Quality gates and commit format
  - MCP server integration instructions
- **docs/CHANGELOG.md** - Detailed change history for v001 and v003

## Current State

**Build Status:** ✓ Passing (all tests pass, TypeScript compiles)
**Test Coverage:** Comprehensive (9 test suites, 45+ tests)
**Version:** 0.1.0
**Main Export:** dist/index.js with TypeScript declarations

**Exported API:**
```typescript
// String utilities
export { reverse, truncate, slugify, capitalize } from './string/index.js';
// Number utilities
export { clamp, roundTo } from './number/index.js';
// Error types
export { ValidationError, EmptyStringError, NegativeNumberError, OutOfRangeError } from './errors/index.js';
// Validation utilities
export { isNonEmptyString, isPositiveNumber, isInRange, assertNonEmptyString } from './validation/index.js';
```

## Package Configuration

**Dependencies:** None
**Dev Dependencies:**
- @types/jest: ^30.0.0
- @types/node: ^20.10.0
- jest: ^30.2.0
- ts-jest: ^29.4.6
- typescript: ^5.3.0

**Scripts:**
- npm run build - Compile TypeScript
- npm test - Run Jest tests
- npm run lint - Placeholder (echoes message, exits 0)
