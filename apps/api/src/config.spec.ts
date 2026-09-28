import { loadConfig } from "./config";

describe("loadConfig", () => {
  it("applies defaults and splits CORS origins", () => {
    const config = loadConfig({ DATABASE_URL: "mysql://root@127.0.0.1:3306/arlink28" });
    expect(config).toEqual({
      nodeEnv: "development",
      port: 3001,
      databaseUrl: "mysql://root@127.0.0.1:3306/arlink28",
      corsOrigins: ["http://localhost:3000", "http://localhost:3002"],
    });
  });

  it("fails fast on a missing or non-MySQL DATABASE_URL", () => {
    expect(() => loadConfig({})).toThrow(/DATABASE_URL/);
    expect(() => loadConfig({ DATABASE_URL: "postgres://x" })).toThrow(/mysql:\/\//);
  });
});
