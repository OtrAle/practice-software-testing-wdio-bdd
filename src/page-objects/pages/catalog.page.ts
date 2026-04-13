import Page from "../pages/base.page.js";
import ProductGrid from "../components/catalog/product-grid.component.js";
import Pagination from "../components/catalog/pagination.component.js";
import Filters from "../components/catalog/sidebar/filters.component.js";
import PriceSlider from "../components/catalog/sidebar/price-slider.component.js";
import Search from "../components/catalog/sidebar/search.component.js";
import Sort from "../components/catalog/sidebar/sort.component.js";
import Navbar from "../components/common/navbar.component.js";

class CatalogPage extends Page {
	get grid() {
		return ProductGrid;
	}
	get pagination() {
		return Pagination;
	}
	get filters() {
		return Filters;
	}
	get priceSlider() {
		return PriceSlider;
	}
	get search() {
		return Search;
	}
	get sort() {
		return Sort;
	}
	get navbar() {
		return Navbar;
	}

	async open(): Promise<void> {
		await super.open("/");
		await this.grid.container.waitForDisplayed();
	}
}

export default new CatalogPage();
