import { When, Then } from "@cucumber/cucumber";
import CatalogPage from "../../src/page-objects/pages/catalog.page.js";

When(
	"the customer selects the {string} checkbox from the {string} section",
	async (value: string, _filterGroup: string) => {
		await CatalogPage.filters.filterCheckbox(value).click();
	},
);

Then("the {string} checkbox should be marked as selected", async (value: string) => {
	await expect(CatalogPage.filters.filterCheckbox(value)).toBeChecked();
});

Then("the product grid should display all items belonging to {string}", async (_value: string) => {
	await expect(await CatalogPage.grid.getCompletedProducts("filter")).toBeElementsArrayOfSize({ gte: 1 });
});

Then("all {string} under {string} should be automatically selected", async (subcategories: string, _value: string) => {
	for (const subcategory of subcategories.split(",")) {
		await expect(CatalogPage.filters.filterCheckbox(subcategory)).toBeChecked();
	}
});

Then("the {string} checkbox should be unselected", async (value: string) => {
	await expect(CatalogPage.filters.filterCheckbox(value)).not.toBeChecked();
});
