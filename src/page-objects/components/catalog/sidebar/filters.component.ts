class Filters {
	filterCheckbox(name: string) {
		return $(`//label[normalize-space(text())="${name}"]//input`);
	}

	get visibleCheckboxes() {
		return $$('input.icheck[name="category_id"]');
	}

	get ecoFriendlyFilter() {
		return $('[data-test="eco-friendly-filter"]');
	}
}

export default new Filters();
