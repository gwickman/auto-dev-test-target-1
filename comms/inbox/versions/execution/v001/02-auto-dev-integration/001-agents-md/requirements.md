# Requirements: agents-md

## Objective
Create AGENTS.md with project-specific instructions for Claude Code, including the mandatory PR workflow.

## Functional Requirements

### FR-1: AGENTS.md location
Create AGENTS.md in project root.

### FR-2: PR workflow
Document the mandatory PR workflow:
1. Create feature branch from main
2. Implement changes
3. Run tests locally
4. Create PR with descriptive title and body
5. Wait for CI to pass
6. Merge PR (squash preferred)

### FR-3: Quality gates
Document required checks before PR:
- `npm run build` must succeed
- `npm test` must pass
- No TypeScript errors

### FR-4: Project context
Include:
- Project description (test target for auto-dev-mcp)
- Technology stack (TypeScript, Jest, GitHub Actions)
- Directory structure overview

### FR-5: Commit conventions
Document commit message format:
- Conventional commits style (feat:, fix:, docs:, etc.)
- Reference feature in commit message when applicable

## Acceptance Criteria
- [ ] AGENTS.md exists in project root
- [ ] Contains PR workflow instructions
- [ ] Contains quality gate requirements
- [ ] Contains project context and tech stack