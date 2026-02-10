# C4 Architecture Documentation

Comprehensive architecture documentation for **auto-dev-test-target-1** following the [C4 model](https://c4model.com/diagrams).

## Documentation Levels

| Level | Document | Description |
|-------|----------|-------------|
| **Context** | [c4-context.md](c4-context.md) | System overview, personas, user journeys, external dependencies |
| **Container** | [c4-container.md](c4-container.md) | Deployment units: npm package, CI pipeline, test runner |
| **Component** | [c4-component.md](c4-component.md) | Master index of 5 logical components and their relationships |
| **Code** | See below | Function-level documentation for each directory |

## Quick Navigation

### Start Here
- **Non-technical stakeholders**: Start with [Context](c4-context.md)
- **System architects**: Start with [Container](c4-container.md)
- **Developers**: Start with [Component](c4-component.md), then drill into code-level docs

### Component Documentation

| Component | Doc |
|-----------|-----|
| Array Utilities | [c4-component-array-utilities.md](c4-component-array-utilities.md) |
| String Utilities | [c4-component-string-utilities.md](c4-component-string-utilities.md) |
| Number Utilities | [c4-component-number-utilities.md](c4-component-number-utilities.md) |
| Error Framework | [c4-component-error-framework.md](c4-component-error-framework.md) |
| Validation Framework | [c4-component-validation-framework.md](c4-component-validation-framework.md) |

### Code-Level Documentation

| Directory | Source Doc | Test Doc |
|-----------|-----------|----------|
| src/ (root) | [c4-code-src.md](c4-code-src.md) | [c4-code-tests.md](c4-code-tests.md) |
| src/array | [c4-code-src-array.md](c4-code-src-array.md) | [c4-code-tests-array.md](c4-code-tests-array.md) |
| src/string | [c4-code-src-string.md](c4-code-src-string.md) | [c4-code-tests-string.md](c4-code-tests-string.md) |
| src/number | [c4-code-src-number.md](c4-code-src-number.md) | [c4-code-tests-number.md](c4-code-tests-number.md) |
| src/errors | [c4-code-src-errors.md](c4-code-src-errors.md) | [c4-code-tests-errors.md](c4-code-tests-errors.md) |
| src/validation | [c4-code-src-validation.md](c4-code-src-validation.md) | [c4-code-tests-validation.md](c4-code-tests-validation.md) |

### API Specifications
- [apis/](apis/) - Note: This is a library, not a service. No HTTP API specs.
