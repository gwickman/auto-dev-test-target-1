# Exclusion Log

## Included Directories (14)

| Directory | Source Files | Reason |
|-----------|-------------|--------|
| src/array | 8 (.ts) | TypeScript source module |
| src/errors | 1 (.ts) | TypeScript source module |
| src/number | 3 (.ts) | TypeScript source module |
| src/object | 8 (.ts) | TypeScript source module |
| src/string | 5 (.ts) | TypeScript source module |
| src/validation | 1 (.ts) | TypeScript source module |
| src | 1 (.ts) | Barrel export index.ts |
| tests/array | 7 (.ts) | Test files for array module |
| tests/errors | 1 (.ts) | Test files for errors module |
| tests/number | 2 (.ts) | Test files for number module |
| tests/object | 7 (.ts) | Test files for object module |
| tests/string | 4 (.ts) | Test files for string module |
| tests/validation | 1 (.ts) | Test files for validation module |
| tests | 1 (.ts) | Barrel test index.test.ts |

## Excluded Directories

| Directory | Exclusion Rule | Reason |
|-----------|---------------|--------|
| .git | `.git` | Version control internals |
| .github | non-code files only | Contains only CI YAML config |
| .github/workflows | non-code files only | Contains only ci.yml |
| node_modules | `node_modules` | Third-party dependencies |
| dist | `dist` | Compiled output |
| dist/array | `dist` | Compiled output |
| dist/errors | `dist` | Compiled output |
| dist/number | `dist` | Compiled output |
| dist/object | `dist` | Compiled output |
| dist/string | `dist` | Compiled output |
| dist/validation | `dist` | Compiled output |
| docs | non-code files only | Documentation root, no source files |
| docs/ideation | `docs/ideation/` | Ideation documents |
| docs/ideation/** (all subdirs) | `docs/ideation/` | Ideation documents (deep tree) |
| comms (all subdirs) | `comms/` | Communication files |
| . (root) | non-code files only | Config files (jest.config.js, tsconfig.json, package.json) and temp scripts only |

## Exclusion Patterns Matched

- `node_modules` - matched
- `.git` - matched
- `dist` - matched (7 directories)
- `docs/ideation/` - matched (multiple nested directories)
- `comms/` - matched
- Non-code-only directories - matched (`.github/`, `.github/workflows/`, `docs/`, root)

## Exclusion Patterns Not Matched (no directories found)

- `build`, `__pycache__`, `.tox`, `.mypy_cache`, `.pytest_cache`
- `.venv`, `venv`, `env`, `.env`, `.eggs`, `*.egg-info`
- `C4-Documentation`, `docs/auto-dev/`
