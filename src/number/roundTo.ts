export function roundTo(value: number, decimals: number): number {
  if (decimals < 0 || !Number.isInteger(decimals)) {
    throw new Error('decimals must be a non-negative integer');
  }
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
