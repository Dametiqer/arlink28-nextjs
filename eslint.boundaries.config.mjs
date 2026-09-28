// Boundary-only lint for the front-end apps and browser-safe packages: it checks
// the database import rule and nothing else, so it can guard apps/web and
// apps/admin without imposing the backend's full rule set on them.
// Run with `pnpm lint:boundaries`.
import tseslint from "typescript-eslint";
import { noDbImports } from "./eslint.boundaries.mjs";

export default tseslint.config(
  {
    ignores: ["**/node_modules/**", "**/.next/**", "**/out/**", "**/dist/**", "**/public/**", "**/.turbo/**"],
  },
  {
    files: [
      "apps/web/**/*.{ts,tsx,js,jsx,mjs,cjs}",
      "apps/admin/**/*.{ts,tsx,js,jsx,mjs,cjs}",
      "packages/shared/src/**/*.ts",
      "packages/emails/src/**/*.{ts,tsx}",
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { ecmaFeatures: { jsx: true }, sourceType: "module" },
    },
    // Ignore inline eslint comments: the boundary can't be switched off with an
    // eslint-disable, and web's comments for rules this config doesn't load (e.g.
    // react-hooks) don't trip "rule not found".
    linterOptions: { noInlineConfig: true, reportUnusedDisableDirectives: "off" },
    rules: noDbImports,
  },
);
