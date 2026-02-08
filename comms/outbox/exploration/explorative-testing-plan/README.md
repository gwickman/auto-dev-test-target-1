# Explorative Testing Plan for auto-dev-mcp Tools

This plan covers comprehensive testing of all 57 auto-dev-mcp MCP tools across 3 destructive test targets. Tools are organized into 8 test areas following a 4-phase execution strategy that validates foundational tools first, then data management, design lifecycle, and finally execution/integration workflows. Key design decisions: use `dry_run=true` wherever available to minimize state mutation, create and hard-delete test data in CRUD cycles, use a dedicated v998 test version for design/execution testing, and leverage parallel explorations across test targets for efficiency.

## Test Targets

| Project | Language | State | Primary Use |
|---------|----------|-------|-------------|
| auto-dev-test-target-1 | TypeScript | v001-v004 completed, 39 backlog items, 5 learnings, 27 explorations | General tool testing, design/execution lifecycle |
| auto-dev-test-target-2-python | Python | v001 completed, 14 backlog items | Cross-language validation, Python quality gates |
| auto-dev-test-blank-1 | None | Empty repository | Bootstrap dry_run testing |

## Tool Coverage Summary

All 57 tools are covered across 8 test areas:

| # | Test Area | Tools | Risk Levels |
|---|-----------|-------|-------------|
| 1 | [Server Diagnostics](test-area-1-server-diagnostics.md) | 5 | SAFE, MEDIUM, HIGH |
| 2 | [Project Management](test-area-2-project-management.md) | 4 | SAFE, MEDIUM |
| 3 | [Template Framework](test-area-3-template-framework.md) | 4 | SAFE, HIGH |
| 4 | [Backlog Management](test-area-4-backlog-management.md) | 6 | SAFE, MEDIUM |
| 5 | [Learning Management](test-area-5-learning-management.md) | 7 | SAFE, MEDIUM |
| 6 | [Design & Version Lifecycle](test-area-6-design-tools.md) | 6 | SAFE, MEDIUM, HIGH |
| 7 | [Execution & Theme Lifecycle](test-area-7-execution-and-theme-lifecycle.md) | 11 | SAFE, HIGH |
| 8 | [Git, Explorations, Quality & Webhooks](test-area-8-git-exploration-quality.md) | 14 | SAFE, MEDIUM, HIGH |

**Total: 57 tools** (SAFE: 25, MEDIUM_RISK: 13, HIGH_RISK: 19)

## Execution Phases

| Phase | Test Areas | Dependencies | Parallelizable |
|-------|-----------|-------------|----------------|
| 1. Foundation | 1, 2 | None | Yes |
| 2. Data Management | 3, 4, 5 | Phase 1 | Yes (across targets) |
| 3. Design Lifecycle | 6 | Phase 2 | No (sequential) |
| 4. Execution & Integration | 7, 8 | Phase 3 | Partially |

See [execution-strategy.md](execution-strategy.md) for detailed phasing, parallelization, cleanup, and failure handling.

## Key Documents

- **Test Area Details:** `test-area-{N}-{name}.md` — One per test area with scenarios, parameters, expected outcomes
- **[Gaps & Recommendations](gaps-and-recommendations.md)** — 10 identified gaps including missing dry_run support, rollback tools, and test repositories
- **[Execution Strategy](execution-strategy.md)** — How to run the plan: phases, parallelization, cleanup, failure handling

## Cleanup Strategy

- CRUD test items are hard-deleted after each test cycle
- `set_log_level` is restored to INFO after diagnostics testing
- `dry_run=true` used for bootstrap and sync_templates
- v998 test version design/state left as acceptable residue
- Webhooks disabled after testing
- Test git commits reverted with `push=false` + reset
