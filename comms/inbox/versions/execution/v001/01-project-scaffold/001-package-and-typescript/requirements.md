# Requirements: package-and-typescript

## Objective
Initialize the Node.js project with TypeScript configuration.

## Functional Requirements

### FR-1: package.json
Create package.json with:
- name: "auto-dev-test-target-1"
- version: "0.1.0"
- type: "module" (ESM)
- scripts: build, test, lint
- devDependencies: typescript, @types/node

### FR-2: tsconfig.json
Create tsconfig.json with:
- target: ES2022
- module: NodeNext
- moduleResolution: NodeNext
- outDir: ./dist
- rootDir: ./src
- strict: true
- declaration: true

### FR-3: Source directory
Create src/ directory with a placeholder index.ts that exports an empty object.

## Acceptance Criteria
- [ ] package.json exists with correct structure
- [ ] tsconfig.json exists with correct compiler options
- [ ] src/index.ts exists
- [ ] `npm install` succeeds
- [ ] `npm run build` compiles without errors