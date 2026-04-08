import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";

export default defineConfig([
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
		},
	},
	tseslint.configs.recommended,
]);
