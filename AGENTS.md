# auto-dev-test-target-1

## Project Overview

This is auto-dev-test-target-1, a minimal TypeScript utility library designed as a test target for auto-dev-mcp integration testing. Treat this as a real project - follow all quality standards and workflows.

## Technology Stack

- **Language**: TypeScript 5.x
- **Runtime**: Node.js 20.x (ESM modules)
- **Testing**: Jest with ts-jest
- **CI**: GitHub Actions

## Directory Structure

```
src/           # Source code
tests/         # Test files
dist/          # Compiled output (gitignored)
docs/          # Documentation
comms/         # auto-dev communication files
```

## Mandatory PR Workflow

**All changes must go through a pull request. Direct commits to main are not allowed.**

1. Create a feature branch: `git checkout -b feat/<feature-name>`
2. Make your changes
3. Run quality checks:
   - `npm run build` - Must compile without errors
   - `npm test` - All tests must pass
4. Commit with conventional commit message: `feat: add <feature>`
5. Push branch and create PR
6. Wait for CI checks to pass
7. Merge PR (squash merge preferred)
8. Delete feature branch

## Quality Gates

Before creating a PR, ensure:
- [ ] TypeScript compiles without errors
- [ ] All tests pass
- [ ] New code has test coverage
- [ ] No console.log statements in production code

## Commit Message Format

Use conventional commits:
- `feat: <description>` - New feature
- `fix: <description>` - Bug fix
- `docs: <description>` - Documentation
- `test: <description>` - Test changes
- `chore: <description>` - Maintenance

## Working with auto-dev

This project uses auto-dev-mcp for orchestrated development:
- Design documents are in `comms/inbox/`
- Completion reports go in `comms/outbox/`
- Follow requirements.md and implementation-plan.md for each feature
