import { execSync } from "node:child_process";
import { resolve } from "node:path";
import { TEST_DATABASE_URL } from "./test-db";

// Drops and recreates the test database from the committed migrations once per
// run, so e2e tests see exactly the schema production will get.
export default function globalSetup(): void {
  if (!/_test\b/.test(TEST_DATABASE_URL)) {
    throw new Error(`Refusing to reset a database whose name doesn't end in _test: ${TEST_DATABASE_URL}`);
  }
  execSync("npx prisma migrate reset --force --skip-seed --skip-generate", {
    cwd: resolve(__dirname, "../../../packages/db"),
    env: { ...process.env, DATABASE_URL: TEST_DATABASE_URL },
    stdio: "inherit",
  });
}
