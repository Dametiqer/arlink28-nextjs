import { loadConfig } from "./config";

describe("loadConfig", () => {
  it("applies defaults and splits CORS origins", () => {
    const config = loadConfig({ DATABASE_URL: "mysql://root@127.0.0.1:3306/arlink28" });
    expect(config).toEqual({
      nodeEnv: "development",
      port: 3001,
      databaseUrl: "mysql://root@127.0.0.1:3306/arlink28",
      corsOrigins: ["http://localhost:3000", "http://localhost:3002"],
      logLevel: "info",
    });
  });

  it("validates LOG_LEVEL", () => {
    const base = { DATABASE_URL: "mysql://root@127.0.0.1:3306/arlink28" };
    expect(loadConfig({ ...base, LOG_LEVEL: "silent" }).logLevel).toBe("silent");
    expect(() => loadConfig({ ...base, LOG_LEVEL: "verbose" })).toThrow(/LOG_LEVEL/);
  });

  it("fails fast on a missing or non-MySQL DATABASE_URL", () => {
    expect(() => loadConfig({})).toThrow(/DATABASE_URL/);
    expect(() => loadConfig({ DATABASE_URL: "postgres://x" })).toThrow(/mysql:\/\//);
  });
});
