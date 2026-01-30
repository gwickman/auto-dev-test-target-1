# Requirements: ci-workflow

## Objective
Create GitHub Actions workflow for continuous integration.

## Functional Requirements

### FR-1: Workflow file
Create .github/workflows/ci.yml that triggers on:
- push to main branch
- pull_request to main branch

### FR-2: Test job
The workflow must:
- Use ubuntu-latest runner
- Setup Node.js 20.x
- Install dependencies with npm ci
- Run build (npm run build)
- Run tests (npm test)

### FR-3: Caching
Cache node_modules using actions/cache or setup-node cache option.

## Acceptance Criteria
- [ ] .github/workflows/ci.yml exists
- [ ] Workflow has valid YAML syntax
- [ ] Workflow runs build and test steps
- [ ] Workflow uses Node.js 20