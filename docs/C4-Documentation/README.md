# C4 Architecture Documentation

**Last Updated:** 2026-02-10 UTC
**Generated for Version:** v003
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

No API specifications generated. This is a library consumed via ESM imports — no network APIs apply.

## Contents

### Components

- [c4-component-string-utilities.md](./c4-component-string-utilities.md) — String transformation functions (capitalize, reverse, slugify, truncate)
- [c4-component-number-utilities.md](./c4-component-number-utilities.md) — Numeric operations (clamp, roundTo) with validated input
- [c4-component-array-utilities.md](./c4-component-array-utilities.md) — Generic array manipulation (chunk, flatten, unique, compact, etc.)
- [c4-component-error-framework.md](./c4-component-error-framework.md) — Cross-cutting error hierarchy and runtime validation guards
- [c4-component-library-shell.md](./c4-component-library-shell.md) — Entry point barrel export and test infrastructure

### Code-Level Documents

- [c4-code-string.md](./c4-code-string.md) — String utility function implementations (src/string)
- [c4-code-number.md](./c4-code-number.md) — Number utility function implementations (src/number)
- [c4-code-array.md](./c4-code-array.md) — Array utility function implementations (src/array)
- [c4-code-errors.md](./c4-code-errors.md) — Custom error class hierarchy (src/errors)
- [c4-code-validation.md](./c4-code-validation.md) — Type guard and assertion functions (src/validation)
- [c4-code-src.md](./c4-code-src.md) — Root barrel export (src/index.ts)
- [c4-code-tests.md](./c4-code-tests.md) — Root test infrastructure placeholder (tests/)
- [c4-code-tests-string.md](./c4-code-tests-string.md) — String function test suite (tests/string)
- [c4-code-tests-number.md](./c4-code-tests-number.md) — Number function test suite (tests/number)
- [c4-code-tests-array.md](./c4-code-tests-array.md) — Array function test suite (tests/array)
- [c4-code-tests-errors.md](./c4-code-tests-errors.md) — Error class test suite (tests/errors)
- [c4-code-tests-validation.md](./c4-code-tests-validation.md) — Validation function test suite (tests/validation)

## Generation History

| Version | Mode | Date | Notes |
|---------|------|------|-------|
| v003 | full | 2026-02-10 | Complete generation — all levels, all directories. No gaps. |

## Regeneration

To regenerate, run the C4 documentation prompt:
- **Full:** Set MODE=full to regenerate everything
- **Delta:** Set MODE=delta to update only changed directories (requires existing C4 docs from a previous full run)
- **Auto:** Set MODE=auto to let the prompt decide (uses delta if possible, falls back to full)
- **Prompt location:** docs/auto-dev/PROMPTS/c4_documentation_prompt/
