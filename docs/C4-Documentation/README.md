# C4 Architecture Documentation

**Last Updated:** 2026-03-04 20:00 UTC
**Generated for Version:** v005
**Generation Mode:** full
**Generator:** auto-dev-mcp C4 documentation prompt

## Quick Reference

| Level | Document | Description |
|-------|----------|-------------|
| Context | [c4-context.md](./c4-context.md) | System context, personas, user journeys |
| Container | [c4-container.md](./c4-container.md) | Deployment containers, APIs, infrastructure |
| Component | [c4-component.md](./c4-component.md) | Component index and relationships |
| Code | c4-code-*.md | Per-directory code analysis |

## C4 Levels Explained

- **Context** (c4-context.md): Who uses the system and what other systems does it talk to? Start here for orientation.
- **Container** (c4-container.md): What are the running processes, databases, and services? Read this for deployment understanding.
- **Component** (c4-component.md + c4-component-*.md): What are the logical modules inside each container? Read for development context.
- **Code** (c4-code-*.md): What functions and classes exist in each directory? Reference during implementation.

## API Specifications

No API specifications generated. This project is a pure utility library with no network APIs; all interaction is via ESM named exports consumed in-process.

## Contents

### Components

| File | Description |
|------|-------------|
| [c4-component-error-framework.md](./c4-component-error-framework.md) | Custom error class hierarchy for all validation failures |
| [c4-component-validation-utilities.md](./c4-component-validation-utilities.md) | Runtime type guards and assertion functions |
| [c4-component-string-utilities.md](./c4-component-string-utilities.md) | String manipulation functions (capitalize, reverse, slugify, truncate) |
| [c4-component-number-utilities.md](./c4-component-number-utilities.md) | Numeric operation functions (clamp, roundTo) |
| [c4-component-array-utilities.md](./c4-component-array-utilities.md) | Array transformation and set-operation functions |
| [c4-component-object-utilities.md](./c4-component-object-utilities.md) | Object manipulation functions (clone, get, isEmpty, keys, merge, omit, pick) |
| [c4-component-library-shell.md](./c4-component-library-shell.md) | Public API barrel entry point (src/index.ts) |
| [c4-component-test-suite.md](./c4-component-test-suite.md) | 224 Jest tests organized by source domain |

### Code-Level Documents

| File | Description |
|------|-------------|
| [c4-code-src.md](./c4-code-src.md) | Root barrel module (src/index.ts) re-exporting all six submodules |
| [c4-code-errors.md](./c4-code-errors.md) | Custom error class hierarchy (ValidationError, EmptyStringError, InvalidNumberError, OutOfRangeError) |
| [c4-code-validation.md](./c4-code-validation.md) | Type predicates and assertion functions for runtime validation |
| [c4-code-string.md](./c4-code-string.md) | String manipulation and transformation functions |
| [c4-code-number.md](./c4-code-number.md) | Pure functional utilities for numeric operations |
| [c4-code-array.md](./c4-code-array.md) | Array manipulation utilities (chunking, filtering, set operations, element access) |
| [c4-code-object.md](./c4-code-object.md) | Object manipulation functions (cloning, property access, merging) |
| [c4-code-tests.md](./c4-code-tests.md) | Root test suite entry point (smoke tests and integration tests) |
| [c4-code-tests-errors.md](./c4-code-tests-errors.md) | Test coverage for custom error class hierarchy |
| [c4-code-tests-validation.md](./c4-code-tests-validation.md) | Tests for validation type guards and assertion functions |
| [c4-code-tests-string.md](./c4-code-tests-string.md) | Tests for string utility functions |
| [c4-code-tests-number.md](./c4-code-tests-number.md) | Tests for numeric utility functions |
| [c4-code-tests-array.md](./c4-code-tests-array.md) | Tests for array manipulation functions |
| [c4-code-tests-object.md](./c4-code-tests-object.md) | Tests for object utility functions |

## Generation History

| Version | Mode | Date | Notes |
|---------|------|------|-------|
| v005 | full | 2026-03-04 | Complete generation; all 4 C4 levels documented; no gaps identified |

## Regeneration

To regenerate, run the C4 documentation prompt:
- **Full:** Set MODE=full to regenerate everything
- **Delta:** Set MODE=delta to update only changed directories (requires existing C4 docs from a previous full run)
- **Auto:** Set MODE=auto to let the prompt decide (uses delta if possible, falls back to full)
- **Prompt location:** docs/auto-dev/PROMPTS/c4_documentation_prompt/
