# C4 Architecture Documentation

**Last Updated**: 2026-03-06 UTC
**Generated for Version**: v006
**Generation Mode**: full

## Quick Reference

| C4 Level | Document | Description |
|---|---|---|
| Context | [c4-context.md](c4-context.md) | System overview, personas, user journeys, external systems |
| Container | [c4-container.md](c4-container.md) | Deployment architecture, API surface, dependencies |
| Component | [c4-component.md](c4-component.md) | Internal component structure, relationships, dependency graph |
| Code | See [Code-Level Documents](#code-level-documents) | Per-directory code analysis with functions, classes, and dependencies |

## C4 Levels Explained

The [C4 model](https://c4model.com/) describes software architecture at four levels of abstraction:

1. **Context** - Shows the system in its environment: who uses it, what external systems it interacts with
2. **Container** - Shows the high-level deployment units (applications, libraries, databases) within the system
3. **Component** - Shows the internal logical components within each container and their relationships
4. **Code** - Shows the implementation details: functions, classes, modules, and their interactions

## API Specifications

No API specification files (OpenAPI/YAML) are present. This is expected for a library consumed via direct ESM imports rather than network APIs.

## Contents

### Components

| Component | Document | Description |
|---|---|---|
| Core Infrastructure | [c4-component-core.md](c4-component-core.md) | Error hierarchy and validation utilities |
| Primitive Utilities | [c4-component-primitives.md](c4-component-primitives.md) | String and number transformations |
| Collection Utilities | [c4-component-collections.md](c4-component-collections.md) | Array and object manipulation |
| Async & Control Flow | [c4-component-async.md](c4-component-async.md) | Promise helpers and function wrappers |
| Package Infrastructure | [c4-component-package.md](c4-component-package.md) | Build config and barrel export |

### Code-Level Documents

#### Source Code
| Document | Directory |
|---|---|
| [c4-code-root.md](c4-code-root.md) | Project root (`package.json`, `tsconfig.json`) |
| [c4-code-src.md](c4-code-src.md) | `src/index.ts` barrel export |
| [c4-code-errors.md](c4-code-errors.md) | `src/errors` |
| [c4-code-validation.md](c4-code-validation.md) | `src/validation` |
| [c4-code-string.md](c4-code-string.md) | `src/string` |
| [c4-code-number.md](c4-code-number.md) | `src/number` |
| [c4-code-array.md](c4-code-array.md) | `src/array` |
| [c4-code-object.md](c4-code-object.md) | `src/object` |
| [c4-code-promise.md](c4-code-promise.md) | `src/promise` |
| [c4-code-function.md](c4-code-function.md) | `src/function` |

#### Test Code
| Document | Directory |
|---|---|
| [c4-code-tests.md](c4-code-tests.md) | `tests/index.test.ts` |
| [c4-code-tests-errors.md](c4-code-tests-errors.md) | `tests/errors` |
| [c4-code-tests-validation.md](c4-code-tests-validation.md) | `tests/validation` |
| [c4-code-tests-string.md](c4-code-tests-string.md) | `tests/string` |
| [c4-code-tests-number.md](c4-code-tests-number.md) | `tests/number` |
| [c4-code-tests-array.md](c4-code-tests-array.md) | `tests/array` |
| [c4-code-tests-object.md](c4-code-tests-object.md) | `tests/object` |
| [c4-code-tests-promise.md](c4-code-tests-promise.md) | `tests/promise` |
| [c4-code-tests-function.md](c4-code-tests-function.md) | `tests/function` |

## Generation History

| Version | Mode | Date | Documents |
|---|---|---|---|
| v006 | full | 2026-03-06 | 27 files (3 level docs + 5 component docs + 19 code docs) |

## Regeneration

To regenerate this documentation, run C4 documentation generation through auto-dev-mcp with:
- **Version**: next version number
- **Mode**: `full` for complete regeneration, or `incremental` for changed files only
- The generation pipeline runs: discovery -> code analysis -> component/container/context synthesis -> finalization
