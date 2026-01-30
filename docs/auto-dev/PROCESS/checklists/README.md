# Process Checklists

Dedicated folder for process checklists referenced by skills.

## Naming Convention
- kebab-case filenames
- Descriptive names: `version-closure.md`, `state-isolation.md`

## Available Checklists

| Checklist | Used By | Purpose |
|-----------|---------|---------|
| state-isolation.md | Feature implementation | State management patterns |
| config-parsing.md | Feature implementation | Config field addition patterns |
| api-parity.md | Feature implementation | MCP/API/CLI parity patterns |

> **Note:** `pre-execution-validation.md` has moved to `skills/auto-dev-design/references/pre-execution-validation.md`.

## Pattern Checklists

Pattern checklists (state-isolation, config-parsing, api-parity) are used during feature implementation when working with specific subsystems. Reference them when:

- **state-isolation.md** — Adding or modifying JSON state files, state services
- **config-parsing.md** — Adding fields to ProjectConfig, modifying YAML parsing
- **api-parity.md** — Changing MCP tools, API endpoints, or CLI commands
