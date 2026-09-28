import { Module } from "@nestjs/common";
import { CoreModule } from "./common/core.module";
import { HealthController } from "./health/health.controller";

@Module({
  imports: [CoreModule],
  controllers: [HealthController],
})
export class AppModule {}
