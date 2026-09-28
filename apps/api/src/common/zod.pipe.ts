import { PipeTransform } from "@nestjs/common";
import type { ZodTypeAny, z } from "zod";

/**
 * Per-parameter validation against a shared zod schema:
 *   list(@Query(new ZodPipe(PageQuery)) query: PageQuery)
 * A ZodError propagates to ErrorFilter → 422 VALIDATION_FAILED with details.
 */
export class ZodPipe<T extends ZodTypeAny> implements PipeTransform<unknown, z.infer<T>> {
  constructor(private readonly schema: T) {}

  transform(value: unknown): z.infer<T> {
    return this.schema.parse(value);
  }
}
