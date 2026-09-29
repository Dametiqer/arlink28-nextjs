import { $Enums } from "@arlink28/db";
import { AddOnUnit, FeatureSection, MediaRole, PricingBasis, VideoProvider } from "@arlink28/shared";

// packages/shared redeclares the Prisma enums (it must stay DB-free for the
// browser). If a migration adds or renames a value, this fails until both agree.
describe("shared enums mirror the Prisma schema", () => {
  it.each([
    ["FeatureSection", FeatureSection.options, Object.values($Enums.FeatureSection)],
    ["AddOnUnit", AddOnUnit.options, Object.values($Enums.AddOnUnit)],
    ["PricingBasis", PricingBasis.options, Object.values($Enums.PricingBasis)],
    ["MediaRole", MediaRole.options, Object.values($Enums.MediaRole)],
    ["VideoProvider", VideoProvider.options, Object.values($Enums.VideoProvider)],
  ])("%s", (_name, shared, prisma) => {
    expect([...shared].sort()).toEqual([...prisma].sort());
  });
});
