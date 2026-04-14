import { When, Then } from "@cucumber/cucumber";
import CatalogPage from "../../src/page-objects/pages/catalog.page.js";

When("the customer sorts the products by {string}", async (sort_option: string) => {
	await CatalogPage.sort.sortDropdown.selectByAttribute("value", sort_option);
});

Then("the products should be displayed in {string} order", async (_sort_order: string) => {
	await expect(await CatalogPage.grid.getCompletedProducts("sorting")).toBeElementsArrayOfSize({ gte: 1 });
});
