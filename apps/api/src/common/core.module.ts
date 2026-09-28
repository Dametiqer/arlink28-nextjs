import { Global, Module } from "@nestjs/common";
import { APP_CONFIG, loadConfig } from "../config";
import { CLOCK, systemClock } from "./clock";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
  providers: [
    { provide: APP_CONFIG, useFactory: () => loadConfig() },
    { provide: CLOCK, useValue: systemClock },
    PrismaService,
  ],
  exports: [APP_CONFIG, CLOCK, PrismaService],
})
export class CoreModule {}
