// ESLint 9 flat config for the backend packages. apps/web keeps
// its own `next lint` setup and is ignored here.
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import { apiDbImports, noDbImports } from "./eslint.boundaries.mjs";

export default tseslint.config(
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/.turbo/**", "apps/web/**", "**/*.js"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Type-aware rules where async bugs actually live: Nest handlers, guards, services.
    files: ["apps/api/src/**/*.ts"],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      // Logging goes through pino (nestjs-pino); console output bypasses levels and redaction.
      "no-console": "error",
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
  // Database boundary (eslint.boundaries.mjs): the API reaches MySQL only via @arlink28/db;
  // the browser-safe packages never do. packages/db itself is where @prisma/client is wrapped.
  { files: ["apps/api/**/*.ts"], rules: apiDbImports },
  { files: ["packages/shared/**/*.ts", "packages/emails/**/*.{ts,tsx}"], rules: noDbImports },
  // Last: turn off stylistic rules that Prettier owns.
  prettier,
);
