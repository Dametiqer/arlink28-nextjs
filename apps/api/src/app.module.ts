import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { LoggerModule } from "nestjs-pino";
import { CatalogueModule } from "./catalogue/catalogue.module";
import { CoreModule } from "./common/core.module";
import { loggerParams } from "./common/logging";
import { APP_CONFIG, AppConfig } from "./config";
import { HealthController } from "./health/health.controller";

@Module({
  imports: [
    CoreModule,
    CatalogueModule,
    LoggerModule.forRootAsync({ inject: [APP_CONFIG], useFactory: (config: AppConfig) => loggerParams(config) }),
    // In-memory per-IP counters: fine for the single Passenger process on cPanel.
    ThrottlerModule.forRootAsync({
      inject: [APP_CONFIG],
      useFactory: (config: AppConfig) => ({
        throttlers: [{ ttl: config.rateLimit.ttlMs, limit: config.rateLimit.max }],
        errorMessage: "Too many requests; please retry later",
      }),
    }),
  ],
  controllers: [HealthController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
