import { Before, After } from "@cucumber/cucumber";
import type { ITestCaseHookParameter } from "@cucumber/cucumber";

Before(async () => {
	await browser.maximizeWindow();
});

After(async function (scenario: ITestCaseHookParameter) {
	await browser.deleteCookies();
	if (scenario.result?.status === "FAILED") {
		const screenshot = await browser.takeScreenshot();
		this.attach(screenshot, "image/png");
	}
});
