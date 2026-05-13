import CatalogPage from "../../src/page-objects/pages/catalog.page.js";
import { Given, When, Then } from "@cucumber/cucumber";

Given("the customer is on the products page", async () => {
	await CatalogPage.open();
});

When('the customer selects {string} from the "Categories" navigation dropdown', async (category: string) => {
	await CatalogPage.navbar.categoriesMenu.click();
	await CatalogPage.navbar.categoryOption(category).click();
});

Then("the customer should be on the {string} page", async (category: string) => {
	expect(await CatalogPage.getCurrentPath()).toBe(CatalogPage.navbar.categoryPath(category));
});
