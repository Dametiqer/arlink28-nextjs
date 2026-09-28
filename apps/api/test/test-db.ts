// e2e tests run against their own database so they never touch dev data.
// Override with TEST_DATABASE_URL (e.g. in CI).
export const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ?? "mysql://root@127.0.0.1:3306/arlink28_test";
