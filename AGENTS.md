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
  string/      # String utility functions
  number/      # Number utility functions
tests/         # Test files
dist/          # Compiled output (gitignored)
docs/          # Documentation
comms/         # auto-dev communication files
```

## Commands

```bash
npm install          # Install dependencies
npm run build        # Compile TypeScript
npm test             # Run tests
npm run lint         # Lint (placeholder)
```

## Quality Gates

Before creating a PR, ensure:
- [ ] `npm run build` - TypeScript compiles without errors
- [ ] `npm test` - All tests pass
- [ ] New code has test coverage
- [ ] No console.log statements in production code

## Commit Message Format

Use conventional commits:
- `feat: <description>` - New feature
- `fix: <description>` - Bug fix
- `docs: <description>` - Documentation
- `test: <description>` - Test changes
- `chore: <description>` - Maintenance

---

## PR Workflow

After completing code changes, follow this workflow:

### 1. Verify locally
```bash
npm run build
npm test
```

Fix any failures before proceeding.

### 2. Commit and push
```bash
git add -A
git commit -m "feat: <description>"
git push -u origin HEAD
```

### 3. Create PR
```bash
gh pr create --fill --base main
```

### 4. Wait for CI and handle failures
```bash
gh pr checks --watch
```

**If CI fails:**
1. View the failure: `gh run view --log-failed`
2. Fix the issues locally
3. Run local verification again (step 1)
4. Commit and push the fix
5. Wait for CI again

**Iteration limit:** Repeat the fix cycle up to **3 times maximum**. If CI still fails after 3 fix attempts:
- Document the persistent issue in your completion report
- Set status to "partial" or "failed"
- Do NOT loop indefinitely
- Return/complete the task

### 5. Merge when CI passes
```bash
gh pr merge --squash --delete-branch
```

### 6. Verify merge
```bash
git checkout main
git pull
```

---

## When Called by MCP Server

When the MCP server invokes you to implement a feature:

1. **Read the prompt carefully** — It specifies which documents to read
2. **Read ALL referenced documents** before starting implementation
3. **Follow process docs** referenced in the prompt
4. **Handle the full PR lifecycle:**
   - Implement the feature
   - Create PR
   - Wait for CI
   - Fix failures (up to 3 attempts)
   - Merge when passing
5. **Create all output documents** specified (completion-report.md)
6. **Return only when:**
   - PR is merged and output docs exist, OR
   - You've documented why completion wasn't possible (status: partial/failed)

**Do not return without either merging or documenting failure.**

---

## Working with auto-dev

This project uses auto-dev-mcp for orchestrated development:
- Design documents are in `comms/inbox/`
- Completion reports go in `comms/outbox/`
- Follow requirements.md and implementation-plan.md for each feature
