# TypeScript Testing Standards

## Test Structure

```
src/
├── __tests__/           # Unit tests
│   └── *.test.ts
└── integration/
    └── *.test.ts        # Integration tests
```

## Tools

- **vitest** or **jest** - Test runner
- **@testing-library** - Component testing
- **msw** - API mocking

## Commands

```bash
# Run all tests
npm test

# With coverage
npm test -- --coverage

# Watch mode
npm test -- --watch

# Specific file
npm test -- path/to/file.test.ts
```

## Coverage Target

Maintain ≥90% coverage.

## Test Patterns

### Basic Test Structure

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '../myModule';

describe('myFunction', () => {
  it('should return expected result', () => {
    const result = myFunction('input');
    expect(result).toBe('expected');
  });

  it('should throw on invalid input', () => {
    expect(() => myFunction(null)).toThrow('Invalid input');
  });
});
```

### Async Tests

```typescript
describe('asyncFunction', () => {
  it('should resolve with data', async () => {
    const result = await asyncFunction();
    expect(result).toEqual({ data: 'value' });
  });

  it('should reject on error', async () => {
    await expect(asyncFunction('invalid'))
      .rejects.toThrow('Error message');
  });
});
```

### Mocking

```typescript
import { vi } from 'vitest';
import { myModule } from '../myModule';
import { dependency } from '../dependency';

vi.mock('../dependency');

describe('myModule', () => {
  it('should use mocked dependency', () => {
    vi.mocked(dependency).mockReturnValue('mocked');

    const result = myModule();

    expect(dependency).toHaveBeenCalled();
    expect(result).toBe('mocked');
  });
});
```

### Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should handle click', async () => {
    const onClick = vi.fn();
    render(<MyComponent onClick={onClick} />);

    await userEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalled();
  });
});
```

## Best Practices

1. Use `describe` blocks to group related tests
2. Use clear, descriptive test names
3. Test behavior, not implementation
4. Mock external dependencies
5. Keep tests focused and isolated
