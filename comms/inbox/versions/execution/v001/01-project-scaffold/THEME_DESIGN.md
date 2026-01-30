# Theme Design: project-scaffold

## Goal
Create a minimal but complete TypeScript project structure with Jest testing and GitHub Actions CI. This establishes the foundation that all future versions will build upon.

## Context
This is a greenfield project - no existing code. The repo currently contains only README.md, LICENSE, .gitignore, and the auto-dev docs structure.

## Architecture Decisions
- **Runtime**: Node.js with TypeScript
- **Testing**: Jest with ts-jest transformer
- **CI**: GitHub Actions with test + lint steps
- **Module system**: ESM (type: module in package.json)
- **Target**: ES2022 for modern Node.js compatibility

## Dependencies
- typescript ^5.x
- jest ^29.x
- ts-jest ^29.x
- @types/jest
- @types/node

## Feature Sequence
1. `001-package-and-typescript` - Creates package.json and tsconfig.json
2. `002-jest-config` - Adds Jest configuration and first test (depends on TS setup)
3. `003-ci-workflow` - Creates GitHub Actions workflow (depends on test setup)

## Success Criteria
- `npm install` succeeds
- `npm test` runs and passes
- `npm run build` compiles TypeScript
- GitHub Actions workflow validates on push/PR
