import { Controller, Get, Res } from "@nestjs/common";
import type { Response } from "express";
import { PrismaService } from "../common/prisma.service";

@Controller("health")
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  /** 200 when MySQL answers, 503 otherwise — what an uptime monitor should poll. */
  @Get()
  async health(@Res({ passthrough: true }) res: Response) {
    const db = await this.prisma.$queryRaw`SELECT 1`.then(
      () => "ok" as const,
      () => "down" as const,
    );
    if (db === "down") res.status(503);
    return { status: db === "ok" ? "ok" : "degraded", db };
  }
}
