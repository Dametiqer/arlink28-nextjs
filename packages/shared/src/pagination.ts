import { z } from "zod";

// Cursor pagination: the cursor is opaque to clients (base64url, produced and
// parsed only by the API).
export const PageQuery = z.object({
  cursor: z.string().max(512).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
export type PageQuery = z.infer<typeof PageQuery>;

export function pageOf<T extends z.ZodTypeAny>(item: T) {
  return z.object({
    items: z.array(item),
    nextCursor: z.string().nullable(),
  });
}
export type Page<T> = { items: T[]; nextCursor: string | null };
