export default class Page {
	protected open(path: string) {
		return browser.url(path);
	}

	async getCurrentPath(): Promise<string> {
		const url = await browser.getUrl();
		return new URL(url).pathname;
	}
}
