class Navbar {
	get categoriesMenu() {
		return $('[data-test="nav-categories"]');
	}

	categoryOption(name: string) {
		return $(`[data-test="nav-${this.toSlug(name)}"]`);
	}

	categoryPath(name: string): string {
		return `/category/${this.toSlug(name)}`;
	}

	private toSlug(name: string): string {
		return name.toLowerCase().replace(/ /g, "-");
	}
}

export default new Navbar();
