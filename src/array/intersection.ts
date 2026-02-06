export function intersection<T>(...arrays: T[][]): T[] {
  if (arrays.length === 0) {
    return [];
  }

  if (arrays.length === 1) {
    return [...new Set(arrays[0])];
  }

  const [first, ...rest] = arrays;
  const uniqueFirst = new Set(first);

  return [...uniqueFirst].filter(item =>
    rest.every(arr => arr.includes(item))
  );
}
