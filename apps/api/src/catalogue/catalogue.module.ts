import { Module } from "@nestjs/common";
import { CatalogueService } from "./catalogue.service";
import { PackagesController } from "./packages.controller";
import { ReferenceController } from "./reference.controller";

/** Public, read-only package catalogue (M1). Admin writes arrive in M3 as a separate module. */
@Module({
  controllers: [PackagesController, ReferenceController],
  providers: [CatalogueService],
})
export class CatalogueModule {}
