import { once } from '../../src/index.js';

describe('once', () => {
  it('executes the function only once', () => {
    const fn = jest.fn(() => 42);
    const onceFn = once(fn);

    onceFn();
    onceFn();
    onceFn();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('returns the cached result on subsequent calls', () => {
    const fn = jest.fn(() => 'hello');
    const onceFn = once(fn);

    const first = onceFn();
    const second = onceFn();
    const third = onceFn();

    expect(first).toBe('hello');
    expect(second).toBe('hello');
    expect(third).toBe('hello');
  });

  it('passes arguments from the first call to fn', () => {
    const fn = jest.fn((a: number, b: number) => a + b);
    const onceFn = once(fn);

    const result = onceFn(3, 4);

    expect(fn).toHaveBeenCalledWith(3, 4);
    expect(result).toBe(7);
  });

  it('ignores arguments from subsequent calls', () => {
    const fn = jest.fn((x: number) => x * 2);
    const onceFn = once(fn);

    const first = onceFn(5);
    const second = onceFn(10);

    expect(first).toBe(10);
    expect(second).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('works with functions returning various types', () => {
    const numFn = once(() => 123);
    expect(numFn()).toBe(123);

    const strFn = once(() => 'abc');
    expect(strFn()).toBe('abc');

    const obj = { key: 'value' };
    const objFn = once(() => obj);
    expect(objFn()).toBe(obj);

    const undefFn = once(() => undefined);
    expect(undefFn()).toBeUndefined();
    undefFn();
    expect(undefFn()).toBeUndefined();
  });

  it('preserves this context', () => {
    const obj = {
      value: 42,
      getValue: once(function (this: { value: number }) {
        return this.value;
      }),
    };

    expect(obj.getValue()).toBe(42);
    expect(obj.getValue()).toBe(42);
  });

  it('preserves function signature type', () => {
    const add = (a: number, b: number): number => a + b;
    const onceAdd: (a: number, b: number) => number = once(add);

    const result: number = onceAdd(1, 2);
    expect(result).toBe(3);
  });
});
