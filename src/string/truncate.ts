export function truncate(str: string, maxLength: number, suffix = '...'): string {
  if (maxLength < suffix.length) {
    throw new Error(`maxLength must be at least ${suffix.length}`);
  }
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - suffix.length) + suffix;
}
