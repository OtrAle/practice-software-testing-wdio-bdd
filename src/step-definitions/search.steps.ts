import { When, Then } from "@cucumber/cucumber";
import CatalogPage from "../../src/page-objects/pages/catalog.page.js";

When("the customer searches for {string}", async (search_term: string) => {
	await CatalogPage.search.searchFor(search_term);
});

When("the customer clicks the clear button in the search bar", async () => {
	await CatalogPage.search.searchReset.click();
});

Then("the search results header should display {string}", async (search_term: string) => {
	await CatalogPage.grid.completedIndicator("search").waitForExist();
	await expect(CatalogPage.grid.searchCaption).toHaveText(search_term);
});
Then("all displayed products should be related to {string}", async (search_term: string) => {
	const apiNames = await CatalogPage.grid.getProductNamesFromApi(search_term);
	const gridNames = await CatalogPage.grid.getProductNamesFromGrid();
	for (const name of gridNames) {
		expect(apiNames).toContain(name);
	}
});

Then("the product grid should not update results", async () => {
	await expect(CatalogPage.search.searchInput).toHaveElementClass("ng-invalid");
});

Then("the product grid should be reset to show all products", async () => {
	await expect(CatalogPage.grid.searchCaption).not.toExist();
});
