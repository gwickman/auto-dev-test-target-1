# GitHub Actions CI Patterns

## Basic Workflow Structure

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
      - name: Set up environment
        # Environment setup
      - name: Run tests
        # Test command
```

## Python Workflow

```yaml
name: Python CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ['3.11', '3.12', '3.13']

    steps:
      - uses: actions/checkout@v4

      - name: Install uv
        uses: astral-sh/setup-uv@v4

      - name: Set up Python ${{ matrix.python-version }}
        run: uv python install ${{ matrix.python-version }}

      - name: Install dependencies
        run: uv sync

      - name: Lint with ruff
        run: uv run ruff check .

      - name: Type check with mypy
        run: uv run mypy src/

      - name: Run tests
        run: uv run pytest --cov --cov-fail-under=90
```

## TypeScript Workflow

```yaml
name: Node CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: ['18', '20', '22']

    steps:
      - uses: actions/checkout@v4

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run typecheck

      - name: Run tests
        run: npm test -- --coverage
```

## Caching

### Python with uv

```yaml
- name: Set up uv cache
  uses: actions/cache@v4
  with:
    path: ~/.cache/uv
    key: ${{ runner.os }}-uv-${{ hashFiles('uv.lock') }}
```

### Node.js

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'  # Built-in caching
```

## Branch Protection

Recommended branch protection settings:
- Require status checks to pass
- Require branches to be up to date
- Require PR reviews

## Best Practices

1. Use matrix builds for multiple versions
2. Cache dependencies for speed
3. Run linting before tests
4. Set coverage thresholds
5. Use concurrency to cancel stale runs

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```
