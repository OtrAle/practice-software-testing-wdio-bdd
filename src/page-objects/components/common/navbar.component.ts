class Navbar {
	get categoriesMenu() {
		return $('[data-test="nav-categories"]');
	}

	categoryOption(name: string) {
		return $(`[data-test="nav-${name.toLowerCase().replace(" ", "-")}"]`);
	}

	categoryPath(name: string) {
		return `/category/${name.toLowerCase().replace(" ", "-")}`;
	}
}

export default new Navbar();
