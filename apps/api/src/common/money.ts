// Prisma returns BIGINT columns as `bigint`, which JSON.stringify rejects.
// These are the only two crossings between the DB type and the wire type.

export function minorToNumber(value: bigint): number {
  if (value > BigInt(Number.MAX_SAFE_INTEGER) || value < BigInt(Number.MIN_SAFE_INTEGER)) {
    throw new RangeError(`Minor amount ${value} exceeds the safe JSON integer range`);
  }
  return Number(value);
}

export function numberToMinor(value: number): bigint {
  if (!Number.isSafeInteger(value)) throw new RangeError(`Minor amount must be a safe integer: ${value}`);
  return BigInt(value);
}
