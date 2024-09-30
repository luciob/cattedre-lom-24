# cattedre-lom-24

# vrt-app-template

This is a template project for starting a new web app using Vite / React / TypeScript.
Other familiar tools are available to ensure best DX.

## .vscode

Added the `.vscode` folder for VSCode shared settings. Defines default prettier extension.

The folder contains also a snippet for quick creation of TS React components.
Can be used in any new file, just start typing `tsreact-component` and fill in the required fields.

## Prettier

`npm install --save-dev prettier`

Added `.prettierignore` copied from `.gitignore`

## ESLint

Installed with cli utility:

`npm init @eslint/config@latest`

Changed the default configuration to specify the React version in use, explicitly removing the annoying `react-in-jsx-scope` rule.
Added the config prettier package: the plugin instead is no longer recommended.

```
  import globals from "globals";
  import pluginJs from "@eslint/js";
  import tseslint from "typescript-eslint";
+ import pluginReact from "eslint-plugin-react";
+ import eslintConfigPrettier from "eslint-config-prettier";

  export default [
+   { settings: { react: { version: "detect" } } },
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
+   { ...pluginReact.configs.flat.recommended, rules: { "react/react-in-jsx-scope": "off" } },
+   eslintConfigPrettier,
  ];
```

**⚠️ Note:** due to TS version mismatch, TS version was fixed to `5.5.4` in `package.json`

## Husky

`npm install --save-dev husky`
