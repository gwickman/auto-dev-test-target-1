import { haltPing } from '../src/index.js';

describe('haltPing', () => {
  it('returns pong', () => {
    expect(haltPing()).toBe('pong');
  });
});
