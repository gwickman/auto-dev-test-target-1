# Exclusion Log — C4 v003 Discovery

## Included Directories

| Directory | Reason |
|-----------|--------|
| `src/array` | Contains 8 .ts source files |
| `src/errors` | Contains 1 .ts source file |
| `src/number` | Contains 3 .ts source files |
| `src/string` | Contains 5 .ts source files |
| `src/validation` | Contains 1 .ts source file |
| `src` | Contains 1 .ts source file (barrel export) |
| `tests/array` | Contains 6 .ts test files |
| `tests/errors` | Contains 1 .ts test file |
| `tests/number` | Contains 2 .ts test files |
| `tests/string` | Contains 4 .ts test files |
| `tests/validation` | Contains 1 .ts test file |
| `tests` | Contains 1 .ts test file |

## Excluded Directories

| Directory | Rule | Reason |
|-----------|------|--------|
| `node_modules` | Exclusion pattern: `node_modules` | Third-party dependencies |
| `.git` | Exclusion pattern: `.git` | Version control system |
| `dist` | Exclusion pattern: `dist` | Compiled output (gitignored) |
| `.pytest_cache` | Exclusion pattern: `.pytest_cache` | Test cache directory |
| `comms` | Exclusion pattern: `comms/` | auto-dev communication files |
| `comms/inbox` | Exclusion pattern: `comms/` | auto-dev communication files |
| `comms/outbox` | Exclusion pattern: `comms/` | auto-dev communication files |
| `comms/state` | Exclusion pattern: `comms/` | auto-dev communication files |
| `docs` | Non-code only | Contains only markdown/documentation |
| `docs/auto-dev` | Exclusion pattern: `docs/auto-dev/` | auto-dev documentation |
| `.github` | Non-code only | Contains only YAML CI config (`ci.yml`) |
| `.github/workflows` | Non-code only | Contains only YAML CI config |
| Root (`.`) | Non-code only | Only `jest.config.js` (config file, not source) |
