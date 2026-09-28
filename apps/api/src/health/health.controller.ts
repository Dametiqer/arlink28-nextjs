import { Controller, Get, Res } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiServiceUnavailableResponse, ApiTags } from "@nestjs/swagger";
import { SkipThrottle } from "@nestjs/throttler";
import type { HealthResponse } from "@arlink28/shared";
import type { Response } from "express";
import { PrismaService } from "../common/prisma.service";
import { schemaRef } from "../docs/openapi-schemas";

// Uptime monitors poll this; throttling it would page us for our own limiter.
@SkipThrottle()
@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  /** 200 when MySQL answers, 503 otherwise — what an uptime monitor should poll. */
  @Get()
  @ApiOperation({ summary: "Liveness + MySQL connectivity" })
  @ApiOkResponse({ description: "API up and MySQL reachable", schema: schemaRef("HealthResponse") })
  @ApiServiceUnavailableResponse({ description: "API up but MySQL unreachable", schema: schemaRef("HealthResponse") })
  async health(@Res({ passthrough: true }) res: Response): Promise<HealthResponse> {
    const db = await this.prisma.$queryRaw`SELECT 1`.then(
      () => "ok" as const,
      () => "down" as const,
    );
    if (db === "down") res.status(503);
    return { status: db === "ok" ? "ok" : "degraded", db };
  }
}
