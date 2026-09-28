// Cron entrypoint — cPanel runs this once a minute:
//   * * * * * node apps/api/dist/worker.js
// Guarded by MySQL GET_LOCK (docs/design/arlink28-platform/DESIGN.md in
// arlink-static-web) so ticks never overlap. Placeholder until Phase 4 wires
// the jobs table: hold expiry, payment reconciliation, email sending, image
// resizing, backups (see docs/monorepo-migration.md).

// Not `async` yet: nothing to await until the jobs table exists.
function tick(): Promise<void> {
  // eslint-disable-next-line no-console -- the cron worker has no Nest/pino logger; cPanel captures stdout
  console.log(`[worker] tick at ${new Date().toISOString()} — no jobs table wired yet`);
  return Promise.resolve();
}

tick().catch((err) => {
  // eslint-disable-next-line no-console -- see tick()
  console.error("[worker] tick failed", err);
  process.exitCode = 1;
});
