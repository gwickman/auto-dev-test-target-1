import { sleep } from '../../src/index.js';
import { InvalidNumberError } from '../../src/errors/index.js';

describe('sleep', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('resolves after the specified delay', async () => {
    const promise = sleep(100);
    await jest.advanceTimersByTimeAsync(100);
    await expect(promise).resolves.toBeUndefined();
  });

  it('resolves immediately for ms=0', async () => {
    const promise = sleep(0);
    await jest.advanceTimersByTimeAsync(0);
    await expect(promise).resolves.toBeUndefined();
  });

  it('rejects with InvalidNumberError for negative numbers', async () => {
    await expect(sleep(-1)).rejects.toThrow(InvalidNumberError);
  });

  it('rejects with InvalidNumberError for NaN', async () => {
    await expect(sleep(NaN)).rejects.toThrow(InvalidNumberError);
  });

  it('rejects with InvalidNumberError for Infinity', async () => {
    await expect(sleep(Infinity)).rejects.toThrow(InvalidNumberError);
  });

  it('rejects with InvalidNumberError for -Infinity', async () => {
    await expect(sleep(-Infinity)).rejects.toThrow(InvalidNumberError);
  });

  it('rejects with InvalidNumberError for non-numeric input', async () => {
    await expect(sleep('100' as unknown as number)).rejects.toThrow(InvalidNumberError);
  });

  it('does not throw synchronously for large ms values', () => {
    const promise = sleep(Number.MAX_SAFE_INTEGER);
    expect(promise).toBeInstanceOf(Promise);
  });
});
