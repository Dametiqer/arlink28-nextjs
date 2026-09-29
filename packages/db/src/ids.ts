import { randomBytes } from "node:crypto";

/**
 * RFC 9562 UUIDv7: 48-bit Unix-ms timestamp + version/variant bits + random.
 * Time-ordered, so inserts append to the InnoDB primary-key B-tree instead of
 * splitting pages. Ordering within the same millisecond is random, which is
 * fine — nothing relies on id order finer than that.
 */
export function uuidv7(nowMs: number = Date.now()): string {
  const bytes = randomBytes(16);
  bytes.writeUIntBE(nowMs, 0, 6);
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
