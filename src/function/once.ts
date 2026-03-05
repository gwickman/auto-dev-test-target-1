export function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;

  return function (this: any, ...args: any[]) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  } as unknown as T;
}
