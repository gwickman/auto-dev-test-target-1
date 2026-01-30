# Implementation Plan: ci-workflow

## Overview
Create GitHub Actions CI workflow for automated testing on push/PR.

## Steps

### Step 1: Create workflow directory
```bash
mkdir -p .github/workflows
```

### Step 2: Create ci.yml
Create .github/workflows/ci.yml:
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Test
        run: npm test
```

### Step 3: Validate YAML
Ensure the YAML is syntactically valid.

## Verification
- [ ] .github/workflows/ci.yml exists
- [ ] File is valid YAML
- [ ] Workflow triggers on push and PR to main
- [ ] Steps include checkout, setup-node, install, build, test