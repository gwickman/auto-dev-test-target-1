import { timeout, TimeoutError, InvalidNumberError, ValidationError } from '../../src/index.js';

describe('timeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns the promise result when it resolves within the time limit', async () => {
    const promise = new Promise<number>((resolve) => {
      setTimeout(() => resolve(42), 50);
    });

    const resultPromise = timeout(promise, 1000);
    await jest.advanceTimersByTimeAsync(50);
    await expect(resultPromise).resolves.toBe(42);
  });

  it('rejects with TimeoutError when promise exceeds the time limit', async () => {
    const promise = new Promise<string>((resolve) => {
      setTimeout(() => resolve('slow'), 5000);
    });

    const resultPromise = timeout(promise, 100);
    const assertion = expect(resultPromise).rejects.toThrow(TimeoutError);
    await jest.advanceTimersByTimeAsync(100);
    await assertion;
  });

  it('rejects with InvalidNumberError for ms=0', () => {
    const promise = Promise.resolve('value');
    expect(() => timeout(promise, 0)).toThrow(InvalidNumberError);
  });

  it('rejects with InvalidNumberError for NaN', () => {
    const promise = Promise.resolve('value');
    expect(() => timeout(promise, NaN)).toThrow(InvalidNumberError);
  });

  it('rejects with InvalidNumberError for Infinity', () => {
    const promise = Promise.resolve('value');
    expect(() => timeout(promise, Infinity)).toThrow(InvalidNumberError);
  });

  it('rejects with InvalidNumberError for negative numbers', () => {
    const promise = Promise.resolve('value');
    expect(() => timeout(promise, -1)).toThrow(InvalidNumberError);
  });

  it('rejects with InvalidNumberError for non-numeric input', () => {
    const promise = Promise.resolve('value');
    expect(() => timeout(promise, '100' as unknown as number)).toThrow(InvalidNumberError);
  });

  it('cleans up the timer when the promise resolves first', async () => {
    const promise = new Promise<string>((resolve) => {
      setTimeout(() => resolve('done'), 50);
    });

    const resultPromise = timeout(promise, 1000);
    await jest.advanceTimersByTimeAsync(50);
    await resultPromise;
    expect(jest.getTimerCount()).toBe(0);
  });

  it('TimeoutError is instanceof TimeoutError and ValidationError', async () => {
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 5000);
    });

    const resultPromise = timeout(promise, 100);
    const assertion = expect(resultPromise).rejects.toThrow(TimeoutError);
    await jest.advanceTimersByTimeAsync(100);
    await assertion;

    await expect(resultPromise).rejects.toBeInstanceOf(ValidationError);
  });

  it('TimeoutError message includes ms value', async () => {
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 5000);
    });

    const resultPromise = timeout(promise, 250);
    const assertion = expect(resultPromise).rejects.toHaveProperty('message', 'Operation timed out after 250ms');
    await jest.advanceTimersByTimeAsync(250);
    await assertion;
  });

  it('preserves the generic return type', async () => {
    const numPromise = new Promise<number>((resolve) => {
      setTimeout(() => resolve(42), 10);
    });

    const resultPromise = timeout(numPromise, 1000);
    await jest.advanceTimersByTimeAsync(10);
    const result: number = await resultPromise;
    expect(result).toBe(42);
  });
});
