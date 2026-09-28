// ESLint 9 flat config for the backend packages. apps/web and apps/admin keep
// their own `next lint` setup and are ignored here.
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/.turbo/**", "apps/web/**", "apps/admin/**", "**/*.js"],
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
  // Last: turn off stylistic rules that Prettier owns.
  prettier,
);
