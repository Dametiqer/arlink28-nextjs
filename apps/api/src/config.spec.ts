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
      rateLimit: { ttlMs: 60_000, max: 120 },
      trustProxy: false,
    });
  });

  it("parses rate limits and TRUST_PROXY as boolean or hop count", () => {
    const base = { DATABASE_URL: "mysql://root@127.0.0.1:3306/arlink28" };
    const c = loadConfig({ ...base, RATE_LIMIT_TTL_MS: "1000", RATE_LIMIT_MAX: "3", TRUST_PROXY: "1" });
    expect(c.rateLimit).toEqual({ ttlMs: 1000, max: 3 });
    expect(c.trustProxy).toBe(1);
    expect(loadConfig({ ...base, TRUST_PROXY: "true" }).trustProxy).toBe(true);
    expect(() => loadConfig({ ...base, TRUST_PROXY: "yes" })).toThrow(/TRUST_PROXY/);
    expect(() => loadConfig({ ...base, RATE_LIMIT_MAX: "0" })).toThrow(/RATE_LIMIT_MAX/);
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
