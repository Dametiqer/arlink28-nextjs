import type { ErrorCode, ErrorDetail } from "@arlink28/shared";

/** Throw this from services for any expected failure; ErrorFilter renders it. */
export class AppError extends Error {
  constructor(
    readonly status: number,
    readonly code: ErrorCode,
    message: string,
    readonly details?: ErrorDetail[],
  ) {
    super(message);
    this.name = "AppError";
  }

  static notFound(what: string): AppError {
    return new AppError(404, "NOT_FOUND", `${what} not found`);
  }

  static validation(message: string, details?: ErrorDetail[]): AppError {
    return new AppError(422, "VALIDATION_FAILED", message, details);
  }

  static conflict(message: string): AppError {
    return new AppError(409, "CONFLICT", message);
  }

  static staleVersion(): AppError {
    return new AppError(409, "STALE_VERSION", "This record was changed by someone else; reload and retry");
  }
}
