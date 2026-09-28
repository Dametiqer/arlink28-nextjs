import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { CoreModule } from "./common/core.module";
import { loggerParams } from "./common/logging";
import { APP_CONFIG, AppConfig } from "./config";
import { HealthController } from "./health/health.controller";

@Module({
  imports: [
    CoreModule,
    LoggerModule.forRootAsync({ inject: [APP_CONFIG], useFactory: (config: AppConfig) => loggerParams(config) }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
