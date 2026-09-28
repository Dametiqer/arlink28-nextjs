import { uuidv7 } from "./ids";

describe("uuidv7", () => {
  it("is a well-formed version 7, RFC variant UUID", () => {
    expect(uuidv7()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it("encodes the millisecond timestamp in the first 48 bits", () => {
    const ms = Date.UTC(2026, 8, 28, 12, 0, 0);
    const hex = uuidv7(ms).replace(/-/g, "").slice(0, 12);
    expect(parseInt(hex, 16)).toBe(ms);
  });

  it("sorts lexically by creation time across milliseconds", () => {
    const ids = [3, 1, 2].map((offset) => uuidv7(1_800_000_000_000 + offset));
    expect([...ids].sort()).toEqual([ids[1], ids[2], ids[0]]);
  });

  it("does not collide", () => {
    const ms = Date.now();
    const ids = new Set(Array.from({ length: 10_000 }, () => uuidv7(ms)));
    expect(ids.size).toBe(10_000);
  });
});
