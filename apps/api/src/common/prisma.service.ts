import { Inject, Injectable, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@arlink28/db";
import { APP_CONFIG, AppConfig } from "../config";

// Connects lazily on the first query (no $connect at boot), so the API still
// starts and /v1/health can report `db: "down"` when MySQL is unreachable.
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor(@Inject(APP_CONFIG) config: AppConfig) {
    super({ datasourceUrl: config.databaseUrl });
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
