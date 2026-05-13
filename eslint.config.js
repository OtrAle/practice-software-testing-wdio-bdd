import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";

export default defineConfig([
	{
		ignores: ["results/", "src/config/wdio.conf.js"],
	},
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
		plugins: { js },
		extends: ["js/recommended"],
		languageOptions: { globals: globals.nodeBuiltin },

		rules: {
			...prettier.rules,
			"no-var": "error",
			"prefer-const": "error",
			"no-unused-vars": "error",
			"no-unreachable": "error",
			"no-console": "warn",
			"no-constant-condition": "error",
			"no-dupe-keys": "error",
			eqeqeq: "error",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
				},
			],
		},
	},
	tseslint.configs.recommended,
]);
