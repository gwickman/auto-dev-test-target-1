import { haltTestPing } from '../src/index.js';

describe('haltTestPing', () => {
  it('returns pong', () => {
    expect(haltTestPing()).toBe('pong');
  });
});
