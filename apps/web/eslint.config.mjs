// ESLint 9 flat config for apps/web. Run with `pnpm --filter @arlink28/web lint`.
// Next 14's `next lint` doesn't read flat config, so the Next rules are loaded
// straight from @next/eslint-plugin-next (wrapped by fixupPluginRules: its 14.x
// rules still call ESLint 8 APIs), and `next build` skips linting
// (next.config.mjs) because CI lints separately.
import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import { noDbImports } from "../../eslint.boundaries.mjs";

export default tseslint.config(
  {
    ignores: [".next/**", "out/**", "public/**", "node_modules/**", "next-env.d.ts"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "@next/next": fixupPluginRules(nextPlugin), "react-hooks": reactHooks },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...reactHooks.configs.recommended.rules,
      // Images are deliberately plain static files, not next/image (see next.config.mjs).
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      ...noDbImports,
    },
  },
  // Last: turn off stylistic rules that Prettier owns.
  prettier,
);
