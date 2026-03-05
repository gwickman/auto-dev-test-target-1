import { debounce, InvalidNumberError } from '../../src/index.js';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('executes the function after the specified delay', async () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    await jest.advanceTimersByTimeAsync(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('coalesces rapid calls into a single execution', async () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced();
    debounced();
    debounced();
    debounced();

    await jest.advanceTimersByTimeAsync(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('uses the last call arguments', async () => {
    const fn = jest.fn((x: number) => x);
    const debounced = debounce(fn, 100);

    debounced(1);
    debounced(2);
    debounced(3);
    debounced(4);
    debounced(5);

    await jest.advanceTimersByTimeAsync(100);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(5);
  });

  it('resets the delay timer on each new call', async () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);

    debounced();
    await jest.advanceTimersByTimeAsync(50);
    expect(fn).not.toHaveBeenCalled();

    debounced();
    await jest.advanceTimersByTimeAsync(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('defers execution with ms=0', async () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 0);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    await jest.advanceTimersByTimeAsync(0);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('throws InvalidNumberError for negative ms', () => {
    const fn = jest.fn();
    expect(() => debounce(fn, -1)).toThrow(InvalidNumberError);
  });

  it('throws InvalidNumberError for NaN', () => {
    const fn = jest.fn();
    expect(() => debounce(fn, NaN)).toThrow(InvalidNumberError);
  });

  it('throws InvalidNumberError for Infinity', () => {
    const fn = jest.fn();
    expect(() => debounce(fn, Infinity)).toThrow(InvalidNumberError);
  });

  it('throws InvalidNumberError for non-numeric input', () => {
    const fn = jest.fn();
    expect(() => debounce(fn, 'abc' as any)).toThrow(InvalidNumberError);
  });

  it('preserves this context', async () => {
    const obj = {
      value: 42,
      getValue: debounce(function (this: { value: number }) {
        return this.value;
      }, 100),
    };

    const spy = jest.spyOn(obj, 'getValue');
    obj.getValue();

    await jest.advanceTimersByTimeAsync(100);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('preserves function signature type', () => {
    const add = (a: number, b: number): number => a + b;
    const debouncedAdd: (a: number, b: number) => number = debounce(add, 100);

    expect(typeof debouncedAdd).toBe('function');
  });
});
