class Pagination {
	get nextButton() {
		return $('[aria-label="Next"]');
	}

	get prevButton() {
		return $('[aria-label="Previous"]');
	}

	get activePage() {
		return $(".page-item.active");
	}

	get pageItems() {
		return $$(".page-item");
	}

	pageButton(number: number) {
		return $(`[aria-label="Page-${number}"]`);
	}

	async clickArrow(arrow: "next" | "previous") {
		await (arrow === "next" ? this.nextButton : this.prevButton).click();
	}
}

export default new Pagination();
