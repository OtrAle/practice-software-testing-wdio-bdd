import fs from "node:fs/promises";
// @ts-expect-error no types available
import { generate } from "multiple-cucumber-html-reporter";

export const config: WebdriverIO.Config = {
	runner: "local",
	tsConfigPath: "./tsconfig.e2e.json",

	specs: ["../features/**/*.feature"],
	exclude: [],

	maxInstances: 4,

	capabilities: [
		{
			browserName: "chrome",
			"goog:chromeOptions": {
				args: ["--lang=en-US"],
			},
		},
	],

	logLevel: "error",
	bail: 0,
	baseUrl: "https://practicesoftwaretesting.com/",

	waitforTimeout: 10000,
	connectionRetryTimeout: 120000,
	connectionRetryCount: 3,

	framework: "cucumber",
	reporters: [
		"spec",
		[
			"cucumberjs-json",
			{
				jsonFolder: ".tmp/json/",
				language: "en",
			},
		],
	],

	cucumberOpts: {
		require: ["./src/step-definitions/**/*.ts"],
		backtrace: false,
		requireModule: [],
		dryRun: false,
		failFast: false,
		name: [],
		snippets: true,
		source: true,
		strict: false,
		tagExpression: "",
		timeout: 80000,
		ignoreUndefinedDefinitions: true,
	},

	onPrepare: () => {
		return fs.rm(".tmp/", { recursive: true, force: true });
	},

	onComplete: () => {
		generate({
			jsonDir: ".tmp/json/",
			reportPath: ".tmp/report/",
		});
	},
};
