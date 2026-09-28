import { Inject, Injectable } from "@nestjs/common";
import type { Prisma } from "@arlink28/db";
import {
  QuoteError,
  quote,
  type DestinationSummary,
  type Money,
  type PackageDetail,
  type PackageList,
  type PackageListQuery,
  type PartnerSummary,
  type Quote,
  type QuoteQuery,
} from "@arlink28/shared";
import { z } from "zod";
import { AppError } from "../common/app-error";
import { CLOCK, type Clock } from "../common/clock";
import { decodeCursor, encodeCursor } from "../common/pagination";
import { PrismaService } from "../common/prisma.service";
import { cardInclude, detailInclude, toCard, toDetail, toPricing } from "./catalogue.mappers";

// Keyset cursor for the list order (featured DESC, sortOrder ASC, id ASC).
const ListCursor = z.tuple([z.union([z.literal(0), z.literal(1)]), z.number().int(), z.string().uuid()]);

@Injectable()
export class CatalogueService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CLOCK) private readonly clock: Clock,
  ) {}

  async listPackages(q: PackageListQuery): Promise<PackageList> {
    const filters: Prisma.PackageWhereInput[] = [{ status: "PUBLISHED" }];
    if (q.destination) filters.push({ destination: { slug: q.destination } });
    if (q.partner) filters.push({ stays: { some: { property: { partner: { slug: q.partner } } } } });
    if (q.category) filters.push({ category: q.category });
    if (q.adults !== undefined) filters.push({ adults: q.adults });
    if (q.children !== undefined) filters.push({ children: q.children });
    if (q.featured !== undefined) filters.push({ featured: q.featured });
    if (q.cursor) {
      const [featured, sortOrder, id] = decodeCursor(q.cursor, ListCursor);
      const sameFeatured = {
        featured: featured === 1,
        OR: [{ sortOrder: { gt: sortOrder } }, { sortOrder, id: { gt: id } }],
      };
      // featured DESC: after a featured row come the rest of the featured rows, then all non-featured.
      filters.push(featured === 1 ? { OR: [sameFeatured, { featured: false }] } : sameFeatured);
    }

    const rows = await this.prisma.package.findMany({
      where: { AND: filters },
      include: cardInclude,
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { id: "asc" }],
      take: q.limit + 1,
    });
    const page = rows.slice(0, q.limit);
    const last = page[page.length - 1];
    const today = this.clock.today();
    return {
      items: page.map((r) => toCard(r, today)),
      nextCursor: rows.length > q.limit ? encodeCursor([last.featured ? 1 : 0, last.sortOrder, last.id]) : null,
    };
  }

  async getPackage(slug: string): Promise<PackageDetail> {
    return toDetail(await this.findPublished(slug), this.clock.today());
  }

  async quotePackage(slug: string, q: QuoteQuery): Promise<Quote> {
    const row = await this.findPublished(slug);
    try {
      const result = quote(toPricing(row), {
        checkIn: q.checkIn,
        nights: q.nights,
        currency: q.currency,
        addOns: q.addOns,
        today: this.clock.today(),
      });
      const money = (amountMinor: number): Money => ({ amountMinor, currency: result.total.currency });
      return {
        packageSlug: row.slug,
        checkIn: result.checkIn,
        checkOut: result.checkOut,
        nights: result.nights,
        party: result.party,
        season: result.season,
        lines: result.lines.map((l) => ({
          kind: l.kind,
          ...(l.kind === "ADD_ON" ? { addOnId: l.addOnId } : {}),
          label: l.label,
          quantity: l.quantity,
          unitPrice: money(l.unitPriceMinor),
          amount: money(l.amountMinor),
        })),
        total: result.total,
        availability: "ON_REQUEST",
      };
    } catch (e) {
      if (e instanceof QuoteError) throw new AppError(422, e.code, e.message);
      throw e;
    }
  }

  async listDestinations(): Promise<{ items: DestinationSummary[] }> {
    const rows = await this.prisma.destination.findMany({ orderBy: { name: "asc" } });
    return { items: rows.map((d) => ({ slug: d.slug, name: d.name, country: d.country })) };
  }

  async listPartners(): Promise<{ items: PartnerSummary[] }> {
    const rows = await this.prisma.partner.findMany({ orderBy: { name: "asc" } });
    return { items: rows.map((p) => ({ slug: p.slug, name: p.name, tagline: p.tagline })) };
  }

  /** Drafts and archived packages are indistinguishable from missing ones on the public API. */
  private async findPublished(slug: string) {
    const row = await this.prisma.package.findFirst({ where: { slug, status: "PUBLISHED" }, include: detailInclude });
    if (!row) throw AppError.notFound("Package");
    return row;
  }
}
