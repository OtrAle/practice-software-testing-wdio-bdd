export default class Page {
	open(path: string) {
		return browser.url(path);
	}

	async getCurrentPath() {
		const url = await browser.getUrl();
		return new URL(url).pathname;
	}
}
