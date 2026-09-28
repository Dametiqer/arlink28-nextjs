import { Writable } from "node:stream";
import pino from "pino";
import { loadConfig } from "../config";
import { loggerParams } from "./logging";

describe("loggerParams", () => {
  const config = loadConfig({ DATABASE_URL: "mysql://root@127.0.0.1:3306/arlink28", NODE_ENV: "production" });

  it("writes JSON (no pretty transport) outside development", () => {
    const params = loggerParams(config);
    expect(params.pinoHttp).toMatchObject({ level: "info", transport: undefined });
  });

  it("pretty-prints only in development", () => {
    const params = loggerParams({ ...config, nodeEnv: "development" });
    expect(params.pinoHttp).toMatchObject({ transport: { target: "pino-pretty" } });
  });

  it("redacts authorization and cookie headers", () => {
    const { redact } = loggerParams(config).pinoHttp as { redact: pino.LoggerOptions["redact"] };
    const lines: string[] = [];
    const sink = new Writable({
      write(chunk: Buffer, _enc, done) {
        lines.push(chunk.toString());
        done();
      },
    });
    pino({ redact }, sink).info({ req: { headers: { authorization: "Bearer s3cret", cookie: "sid=s3cret", host: "x" } } });
    expect(lines.join("")).not.toContain("s3cret");
    expect(JSON.parse(lines[0]).req.headers).toEqual({ authorization: "[redacted]", cookie: "[redacted]", host: "x" });
  });
});
