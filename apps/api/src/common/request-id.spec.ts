import { isSafeRequestId } from "./request-id";

describe("isSafeRequestId", () => {
  it.each(["abc-123", "0192a0b2-0000-7000-8000-000000000000", "trace.id_1", "a".repeat(64)])("accepts %s", (id) => {
    expect(isSafeRequestId(id)).toBe(true);
  });

  it.each(["", "a".repeat(65), "has space", "line\nbreak", "<script>", undefined])("rejects %p", (id) => {
    expect(isSafeRequestId(id)).toBe(false);
  });
});
