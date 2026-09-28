/** Two projects: `unit` (pure, no DB) and `e2e` (HTTP + a real MySQL test database). */
const base = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: __dirname,
};

// Scope with `roots` (plain paths) + relative globs rather than `<rootDir>/…`
// globs: on Windows the substituted rootDir can contain `\.` (e.g. a `.tmp`
// worktree), which micromatch reads as an escape, so nothing matches.
module.exports = {
  projects: [
    { ...base, displayName: "unit", roots: ["<rootDir>/src"], testMatch: ["**/*.spec.ts"] },
    {
      ...base,
      displayName: "e2e",
      roots: ["<rootDir>/test"],
      testMatch: ["**/*.e2e-spec.ts"],
      globalSetup: "<rootDir>/test/global-setup.ts",
      setupFiles: ["<rootDir>/test/env.ts"],
    },
  ],
};
