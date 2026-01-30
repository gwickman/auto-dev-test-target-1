# auto-dev-test-target-1

auto-dev-test-target-1 project

## Development Setup

```bash
uv sync
```

## Quality Gates

Before committing, run:

```bash
# Lint
uv run ruff check src/

# Format
uv run ruff format src/

# Type check
uv run mypy src/

# Test
uv run pytest
```

## PR Workflow

**IMPORTANT: Follow this workflow exactly. Do not paraphrase or summarize.**

1. Create PR: `gh pr create --fill --base main`
2. Wait for CI: `gh pr checks --watch`
3. If CI fails: `gh run view --log-failed`
4. Fix issues and push (max 3 iterations)
5. Merge: `gh pr merge --squash --delete-branch`

## When Called by MCP Server

When this agent is spawned by an MCP server for autonomous execution:

1. **Read the full prompt** provided in the spawning message
2. **Execute exactly what is requested** - no more, no less
3. **Follow the PR workflow above** for all code changes
4. **Report completion** by writing to the specified output location
5. **Do not ask for clarification** - work with what is provided
6. **Respect iteration limits** - max 3 CI fix attempts before reporting failure

## Code Style

- **Linter:** ruff
- **Type Checker:** mypy
- **Type Hints:** Required for all public APIs
- **Test Framework:** pytest
- **Patterns:** dataclasses, async/await

## Project Structure

```
auto-dev-test-target-1/
├── comms/
├── docs/
├── LICENSE
├── README.md
```
