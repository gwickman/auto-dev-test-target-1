export function compact<T>(arr: T[]): T[] {
  // Filter removes all falsy values: false, null, 0, "", undefined, NaN
  // Type assertion needed because TypeScript cannot narrow falsy types automatically
  return arr.filter(Boolean) as T[];
}
