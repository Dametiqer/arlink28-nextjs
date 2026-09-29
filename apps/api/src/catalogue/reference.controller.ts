import { Controller, Get, Header } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { schemaRef } from "../docs/openapi-schemas";
import { CatalogueService } from "./catalogue.service";

// Small lookup lists for filter chips and co-branding; they change rarely.
const REFERENCE_CACHE = "public, max-age=300, stale-while-revalidate=3600";

@ApiTags("catalogue")
@Controller()
export class ReferenceController {
  constructor(private readonly catalogue: CatalogueService) {}

  @Get("destinations")
  @Header("Cache-Control", REFERENCE_CACHE)
  @ApiOperation({ summary: "Destinations, for package filters" })
  @ApiOkResponse({ schema: schemaRef("DestinationList") })
  destinations() {
    return this.catalogue.listDestinations();
  }

  @Get("partners")
  @Header("Cache-Control", REFERENCE_CACHE)
  @ApiOperation({ summary: "Partners (co-branding), for package filters" })
  @ApiOkResponse({ schema: schemaRef("PartnerList") })
  partners() {
    return this.catalogue.listPartners();
  }
}
