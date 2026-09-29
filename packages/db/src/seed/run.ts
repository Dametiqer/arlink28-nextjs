import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { isIsoDate, isoDateOf } from "@arlink28/shared";
import { PrismaClient } from "@prisma/client";
import { seedCatalogue } from "./seed-catalogue";

// Usage (after `pnpm --filter @arlink28/db build`):
//   pnpm --filter @arlink28/db seed                    # today = current UTC date
//   pnpm --filter @arlink28/db seed -- --today=2026-09-28
// Refuses NODE_ENV=production unless --allow-production: re-running resets
// seeded packages to the poster data, overwriting admin edits to them.

async function main(): Promise<void> {
  const envFile = resolve(__dirname, "../../.env");
  if (existsSync(envFile)) process.loadEnvFile(envFile);

  const args = process.argv.slice(2);
  if (process.env.NODE_ENV === "production" && !args.includes("--allow-production")) {
    throw new Error("Refusing to seed with NODE_ENV=production (pass --allow-production for the initial load)");
  }
  const todayArg = args.find((a) => a.startsWith("--today="))?.slice("--today=".length);
  if (todayArg !== undefined && !isIsoDate(todayArg)) throw new Error(`--today must be YYYY-MM-DD, got ${todayArg}`);
  const today = todayArg ?? isoDateOf(new Date());

  const prisma = new PrismaClient();
  try {
    const summary = await seedCatalogue(prisma, { today });
    for (const p of summary.packages) console.log(`${p.action.padEnd(7)} ${p.status.padEnd(9)} ${p.slug}`);
    console.log(`\nSeeded ${summary.packages.length} packages (today = ${today}).`);
    if (summary.drafts.length) {
      console.warn(`\n${summary.drafts.length} package(s) left in DRAFT until their poster data is confirmed:`);
      for (const d of summary.drafts) console.warn(`- ${d.slug}: ${d.dataIssue}`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exitCode = 1;
});
