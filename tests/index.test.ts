import { keys } from '../src/index';

describe('root index exports', () => {
  it('exports keys from object module', () => {
    expect(typeof keys).toBe('function');
    const result = keys({ a: 1, b: 2 });
    expect(result.sort()).toEqual(['a', 'b']);
  });
});
