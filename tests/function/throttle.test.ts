import { throttle, InvalidNumberError } from '../../src/index.js';

describe('throttle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('executes the first call immediately', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('ignores calls within the ms window', async () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);

    throttled();
    throttled();
    throttled();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('executes again after the ms window elapses', async () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    await jest.advanceTimersByTimeAsync(100);

    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('works correctly across multiple time windows', async () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    await jest.advanceTimersByTimeAsync(100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);

    await jest.advanceTimersByTimeAsync(100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('passes arguments to the original function', () => {
    const fn = jest.fn((a: number, b: number) => a + b);
    const throttled = throttle(fn, 100);

    throttled(1, 2);
    expect(fn).toHaveBeenCalledWith(1, 2);
  });

  it('throws InvalidNumberError for ms=0', () => {
    const fn = jest.fn();
    expect(() => throttle(fn, 0)).toThrow(InvalidNumberError);
  });

  it('throws InvalidNumberError for NaN', () => {
    const fn = jest.fn();
    expect(() => throttle(fn, NaN)).toThrow(InvalidNumberError);
  });

  it('throws InvalidNumberError for Infinity', () => {
    const fn = jest.fn();
    expect(() => throttle(fn, Infinity)).toThrow(InvalidNumberError);
  });

  it('throws InvalidNumberError for negative ms', () => {
    const fn = jest.fn();
    expect(() => throttle(fn, -1)).toThrow(InvalidNumberError);
  });

  it('throws InvalidNumberError for non-numeric input', () => {
    const fn = jest.fn();
    expect(() => throttle(fn, 'abc' as any)).toThrow(InvalidNumberError);
  });

  it('preserves this context', () => {
    const obj = {
      value: 42,
      getValue: throttle(function (this: { value: number }) {
        return this.value;
      }, 100),
    };

    const result = obj.getValue();
    expect(result).toBe(42);
  });

  it('preserves function signature type', () => {
    const add = (a: number, b: number): number => a + b;
    const throttledAdd: (a: number, b: number) => number = throttle(add, 100);

    expect(typeof throttledAdd).toBe('function');
  });
});
