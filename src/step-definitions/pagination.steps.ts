import { When, Then, Given } from "@cucumber/cucumber";
import CatalogPage from "../../src/page-objects/pages/catalog.page.js";

let firstCardBefore: string | null = null;

Given("the customer is on page {int}", async (current_page: number) => {
	await CatalogPage.pagination.pageButton(current_page).click();
});

When("the customer clicks on the page number button {int}", async (pageNumber: number) => {
	firstCardBefore = await CatalogPage.grid.getProductId();
	await CatalogPage.pagination.pageButton(pageNumber).click();
	await CatalogPage.grid.waitUntilFirstProductChangesFrom(firstCardBefore ?? "");
});

When("the customer clicks on the {string} arrow button", async (arrow: string) => {
	firstCardBefore = await CatalogPage.grid.getProductId();
	await CatalogPage.pagination.clickArrow(arrow as "next" | "previous");
	await CatalogPage.grid.waitUntilFirstProductChangesFrom(firstCardBefore ?? "");
});

When("the customer clicks on the {string} page of the catalog", async (_page_position: string) => {
	const items = await CatalogPage.pagination.pageItems.getElements();
	await items.at(-2)?.click();
});

Then("the product grid should display the next set of items", async () => {
	expect(await CatalogPage.grid.getProductId()).not.toBe(firstCardBefore);
});

Then("the page number {string} should be active", async (pageNumber: string) => {
	await expect(CatalogPage.pagination.activePage).toHaveText(pageNumber);
});

Then("the {string} arrow button should be disabled", async (_arrow: string) => {
	const items = await CatalogPage.pagination.pageItems.getElements();
	await expect(items.at(-1)).toHaveElementClass("disabled");
});
