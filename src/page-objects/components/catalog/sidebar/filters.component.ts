class Filters {
	filterCheckbox(name: string) {
		return $(`//label[normalize-space(text())="${name}"]//input`);
	}

	get visibleCheckboxes() {
		return $$('input.icheck[name="category_id"]');
	}
}

export default new Filters();
