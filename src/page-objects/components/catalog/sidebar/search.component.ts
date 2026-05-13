class Search {
	get searchInput() {
		return $('[data-test="search-query"]');
	}

	get searchSubmit() {
		return $('[data-test="search-submit"]');
	}

	get searchReset() {
		return $('[data-test="search-reset"]');
	}

	async searchFor(term: string): Promise<void> {
		await this.searchInput.setValue(term);
		await this.searchSubmit.click();
	}
}
export default new Search();
