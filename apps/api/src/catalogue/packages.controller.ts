import { Controller, Get, Header, Param, Query } from "@nestjs/common";
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { PackageListQuery, QuoteQuery } from "@arlink28/shared";
import { ZodPipe } from "../common/zod.pipe";
import { ApiZodQuery, schemaRef } from "../docs/openapi-schemas";
import { CatalogueService } from "./catalogue.service";

// Public, anonymous and cacheable: the web app renders these with ISR (≤ 5 min stale).
const PUBLIC_CACHE = "public, max-age=60, stale-while-revalidate=300";

@ApiTags("packages")
@Controller("packages")
export class PackagesController {
  constructor(private readonly catalogue: CatalogueService) {}

  @Get()
  @Header("Cache-Control", PUBLIC_CACHE)
  @ApiOperation({ summary: "List published packages (cursor-paginated)" })
  @ApiZodQuery(PackageListQuery)
  @ApiOkResponse({ schema: schemaRef("PackageList") })
  list(@Query(new ZodPipe(PackageListQuery)) query: PackageListQuery) {
    return this.catalogue.listPackages(query);
  }

  @Get(":slug")
  @Header("Cache-Control", PUBLIC_CACHE)
  @ApiOperation({ summary: "Full package detail: stays, inclusions, upcoming seasons with prices, add-ons" })
  @ApiParam({ name: "slug", example: "giraffe-manor-grand-escape" })
  @ApiOkResponse({ schema: schemaRef("PackageDetail") })
  @ApiNotFoundResponse({ description: "Unknown, draft or archived package", schema: schemaRef("ErrorEnvelope") })
  detail(@Param("slug") slug: string) {
    return this.catalogue.getPackage(slug);
  }

  @Get(":slug/quote")
  @Header("Cache-Control", PUBLIC_CACHE)
  @ApiOperation({
    summary: "Price a stay for a check-in date",
    description:
      "Advisory price only: availability is confirmed with the property before payment. The season is chosen by " +
      "the check-in date. Add-ons are `<addOnId>:<quantity>` pairs, comma-separated (ids from the package detail).",
  })
  @ApiParam({ name: "slug", example: "giraffe-manor-grand-escape" })
  @ApiZodQuery(QuoteQuery)
  @ApiOkResponse({ schema: schemaRef("Quote") })
  @ApiNotFoundResponse({ description: "Unknown, draft or archived package", schema: schemaRef("ErrorEnvelope") })
  @ApiUnprocessableEntityResponse({
    description:
      "Invalid query, or no quote possible: CHECK_IN_IN_PAST, BELOW_MIN_NIGHTS, EXTRA_NIGHTS_NOT_SOLD, " +
      "NO_RATE_FOR_DATE, CURRENCY_NOT_AVAILABLE, UNKNOWN_ADD_ON",
    schema: schemaRef("ErrorEnvelope"),
  })
  quote(@Param("slug") slug: string, @Query(new ZodPipe(QuoteQuery)) query: QuoteQuery) {
    return this.catalogue.quotePackage(slug, query);
  }
}
