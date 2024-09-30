import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    // Copied from .prettierignore
    ignores: [
      "logs",
      "*.log",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
      "pnpm-debug.log*",
      "lerna-debug.log*",
      "node_modules",
      "dist",
      "dist-ssr",
      "*.local",
      ".vscode/*",
      "!.vscode/extensions.json",
      ".idea",
      ".DS_Store",
      "*.suo",
      "*.ntvs*",
      "*.njsproj",
      "*.sln",
      "*.sw?",
      /* Data big files */
      "data/accantonamenti",
      "data/geo-db-lom.json",
      "data/miur-db.json",
      "data/seats-db-lom.json",
    ],
  },
  { settings: { react: { version: "detect" } } },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { ...pluginReact.configs.flat.recommended, rules: { "react/react-in-jsx-scope": "off" } },
  eslintConfigPrettier,
];
