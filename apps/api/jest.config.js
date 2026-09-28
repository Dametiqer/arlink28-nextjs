/** Two projects: `unit` (pure, no DB) and `e2e` (HTTP + a real MySQL test database). */
const base = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: __dirname,
};

module.exports = {
  projects: [
    { ...base, displayName: "unit", testMatch: ["<rootDir>/src/**/*.spec.ts"] },
    {
      ...base,
      displayName: "e2e",
      testMatch: ["<rootDir>/test/**/*.e2e-spec.ts"],
      globalSetup: "<rootDir>/test/global-setup.ts",
      setupFiles: ["<rootDir>/test/env.ts"],
    },
  ],
};
