import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { PACKAGES } from "./catalogue-data";
import { validateSeed } from "./seed-catalogue";

describe("poster catalogue seed", () => {
  it("satisfies the catalogue invariants", () => {
    expect(() => validateSeed()).not.toThrow();
  });

  it("transcribes all 17 posters into 13 packages, each poster used exactly once", () => {
    const sources = PACKAGES.flatMap((p) => p.sources);
    expect(PACKAGES).toHaveLength(13);
    expect(sources).toHaveLength(17);
    expect(new Set(sources).size).toBe(17);
  });

  // Runs only on machines that have the company docs folder (not in CI).
  const posterDir = resolve(__dirname, "../../../../../../../Company docs/Packages");
  const havePosters = (() => {
    try {
      return readdirSync(posterDir).length > 0;
    } catch {
      return false;
    }
  })();
  (havePosters ? it : it.skip)("references poster files that actually exist", () => {
    const files = new Set(readdirSync(posterDir));
    expect(PACKAGES.flatMap((p) => p.sources).filter((s) => !files.has(s))).toEqual([]);
  });

  it("keeps every package with contradictory posters out of the public catalogue", () => {
    expect(PACKAGES.filter((p) => p.dataIssue).map((p) => [p.slug, p.status])).toEqual([
      ["salas-extended-mara-experience", "DRAFT"],
      ["salas-family-safari", "DRAFT"],
      ["safari-collection-explorer", "DRAFT"],
    ]);
  });

  it("rejects a transcription error such as overlapping seasons or stays that don't add up", () => {
    const [first] = PACKAGES;
    expect(() => validateSeed([{ ...first, nights: first.nights + 1, minNights: first.nights + 1 }])).toThrow(
      /stays sum/,
    );
    expect(() =>
      validateSeed([
        {
          ...first,
          rates: [
            { season: "safari-collection-peak-2026", priceMinor: 1 },
            { season: "giraffe-manor-2026", priceMinor: 2 },
          ],
        },
      ]),
    ).toThrow(/overlap/);
  });
});
