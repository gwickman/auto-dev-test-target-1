import { retry } from '../../src/index.js';
import { InvalidNumberError } from '../../src/errors/index.js';

describe('retry', () => {
  it('returns the result on first success', async () => {
    const fn = jest.fn().mockResolvedValue(42);
    const result = await retry(fn, 3);
    expect(result).toBe(42);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries on failure and returns on success', async () => {
    const fn = jest.fn()
      .mockRejectedValueOnce(new Error('fail 1'))
      .mockRejectedValueOnce(new Error('fail 2'))
      .mockResolvedValue('success');
    const result = await retry(fn, 3);
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('throws the last error after all attempts fail', async () => {
    const lastError = new Error('fail 3');
    const fn = jest.fn()
      .mockRejectedValueOnce(new Error('fail 1'))
      .mockRejectedValueOnce(new Error('fail 2'))
      .mockRejectedValueOnce(lastError);
    await expect(retry(fn, 3)).rejects.toThrow(lastError);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('calls fn exactly once with attempts=1 and throws on failure', async () => {
    const error = new Error('single fail');
    const fn = jest.fn().mockRejectedValue(error);
    await expect(retry(fn, 1)).rejects.toThrow(error);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('preserves the exact error from the last attempt', async () => {
    const specificError = new TypeError('specific error');
    const fn = jest.fn()
      .mockRejectedValueOnce(new Error('first'))
      .mockRejectedValueOnce(specificError);
    await expect(retry(fn, 2)).rejects.toBe(specificError);
  });

  it('returns correct generic type', async () => {
    const result: number = await retry(() => Promise.resolve(42), 1);
    expect(result).toBe(42);
  });

  describe('input validation', () => {
    const fn = jest.fn().mockResolvedValue('ok');

    it('rejects attempts=0', async () => {
      await expect(retry(fn, 0)).rejects.toThrow(InvalidNumberError);
    });

    it('rejects negative attempts', async () => {
      await expect(retry(fn, -1)).rejects.toThrow(InvalidNumberError);
    });

    it('rejects NaN', async () => {
      await expect(retry(fn, NaN)).rejects.toThrow(InvalidNumberError);
    });

    it('rejects Infinity', async () => {
      await expect(retry(fn, Infinity)).rejects.toThrow(InvalidNumberError);
    });

    it('rejects fractional attempts', async () => {
      await expect(retry(fn, 1.5)).rejects.toThrow(InvalidNumberError);
    });

    it('rejects non-numeric input', async () => {
      await expect(retry(fn, '3' as unknown as number)).rejects.toThrow(InvalidNumberError);
    });
  });
});
