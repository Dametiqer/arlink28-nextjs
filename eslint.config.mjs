// ESLint 9 flat config for the workspace packages. apps/web keeps
// its own `next lint` setup and is ignored here.
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import { noDbImports } from "./eslint.boundaries.mjs";

export default tseslint.config(
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/.turbo/**", "apps/web/**", "**/*.js"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
  // Database boundary (eslint.boundaries.mjs): the browser-safe packages never touch the DB.
  { files: ["packages/shared/**/*.ts", "packages/emails/**/*.{ts,tsx}"], rules: noDbImports },
  // Last: turn off stylistic rules that Prettier owns.
  prettier,
);
