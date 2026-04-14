import { When, Then, Given } from "@cucumber/cucumber";
import CatalogPage from "../../src/page-objects/pages/catalog.page.js";

Given("the product grid is displayed", async () => {
	await expect(CatalogPage.grid.container).toBeDisplayed();
});

When("the product grid container is displayed", async () => {
	await expect(CatalogPage.grid.container).toBeDisplayed();
});

Then("products should be visible in the catalog", async () => {
	await expect(CatalogPage.grid.productCards).toBeElementsArrayOfSize({ gte: 1 });
});

Then("each product should display a name", async () => {
	for await (const card of CatalogPage.grid.productCards) {
		await expect(CatalogPage.grid.getProductName(card)).toBeDisplayed();
	}
});

Then("each product should display a price", async () => {
	for await (const card of CatalogPage.grid.productCards) {
		await expect(CatalogPage.grid.getProductPrice(card)).toBeDisplayed();
	}
});

Then("each product should display an image", async () => {
	for await (const card of CatalogPage.grid.productCards) {
		await expect(CatalogPage.grid.getProductImage(card)).toBeDisplayed();
	}
});

Then("each product should display CO2 rating", async () => {
	for await (const card of CatalogPage.grid.productCards) {
		await expect(CatalogPage.grid.getProductCO2(card)).toBeDisplayed();
	}
});
