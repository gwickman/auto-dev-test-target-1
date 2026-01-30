# Requirements: jest-config

## Objective
Configure Jest for TypeScript testing with a passing placeholder test.

## Functional Requirements

### FR-1: Jest dependencies
Add to package.json devDependencies:
- jest ^29.x
- ts-jest ^29.x
- @types/jest

### FR-2: Jest configuration
Create jest.config.js with:
- preset: ts-jest/presets/default-esm
- testEnvironment: node
- extensionsToTreatAsEsm: [".ts"]
- moduleNameMapper for .js extension handling

### FR-3: Test script
Update package.json test script to run jest.

### FR-4: Placeholder test
Create tests/index.test.ts with a simple passing test.

## Acceptance Criteria
- [ ] jest.config.js exists with ESM-compatible settings
- [ ] tests/ directory exists
- [ ] tests/index.test.ts exists with at least one test
- [ ] `npm test` runs jest and passes