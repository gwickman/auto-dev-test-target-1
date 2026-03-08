import { smokeTestGreet } from '../src/index.js';

describe('smokeTestGreet', () => {
  it('returns greeting with name', () => {
    expect(smokeTestGreet('World')).toBe('Hello, World! (smoke test)');
  });
});
