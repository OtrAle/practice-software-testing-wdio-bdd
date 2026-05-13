class ProductGrid {
	get container() {
		return $("div.container[data-test]");
	}

	get productCards() {
		return $$('a.card[data-test^="product-"]');
	}

	get noResults() {
		return $('[data-test="no-results"]');
	}

	completedIndicator(type: "sorting" | "filter" | "search") {
		return $(`[data-test="${type}_completed"]`);
	}

	get pageTitle() {
		return $('[data-test="page-title"]');
	}

	get searchCaption() {
		return $('[data-test="search-term"]');
	}

	getProductName(card: WebdriverIO.Element) {
		return card.$('[data-test="product-name"]');
	}

	getProductPrice(card: WebdriverIO.Element) {
		return card.$('[data-test="product-price"]');
	}

	getProductImage(card: WebdriverIO.Element) {
		return card.$("img");
	}

	getProductCO2(card: WebdriverIO.Element) {
		return card.$('[data-test="co2-rating-badge"]');
	}

	async getProductId(index = 0): Promise<string | null> {
		const cards = this.productCards;
		return await cards[index].getAttribute("data-test");
	}

	async waitUntilFirstProductChangesFrom(previousId: string): Promise<void> {
		await browser.waitUntil(async () => {
			const currentId = await this.getProductId();
			return currentId !== previousId;
		});
	}

	async getProductPriceAsNumber(card: WebdriverIO.Element): Promise<number> {
		const priceText = await this.getProductPrice(card).getText();
		return parseFloat(priceText.replace(/[^0-9.]/g, ""));
	}

	async getCompletedProducts(type: "sorting" | "filter" | "search") {
		await this.completedIndicator(type).waitForExist();
		return this.productCards;
	}

	async getProductNamesFromGrid(): Promise<string[]> {
		const cards = await this.productCards.getElements();
		const names: string[] = [];
		for (const card of cards) {
			names.push(await this.getProductName(card).getText());
		}
		return names;
	}

	async getProductNamesFromApi(searchTerm: string): Promise<string[]> {
		const response = await fetch(`https://api.practicesoftwaretesting.com/products/search?q=${searchTerm}`);
		const data = await response.json();
		return data.data.map((p: { name: string }) => p.name);
	}
}

export default new ProductGrid();
