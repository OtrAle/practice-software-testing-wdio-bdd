import { When, Then } from "@cucumber/cucumber";
import CatalogPage from "../../src/page-objects/pages/catalog.page.js";

When("the customer sets the price slider from {int} to {int}", async (min: number, max: number) => {
	await CatalogPage.priceSlider.setSliderRange(min, max);
});

Then("the price labels should display the range {int} to {int}", async (min: number, max: number) => {
	expect(await CatalogPage.priceSlider.getRange()).toEqual({ min, max });
});

Then("all displayed products should have a price between {int} to {int}", async (min: number, max: number) => {
	await CatalogPage.sort.sortDropdown.selectByAttribute("value", "price,desc");
	await expect(await CatalogPage.grid.getCompletedProducts("sorting")).toBeElementsArrayOfSize({ gte: 1 });
	const cards = await CatalogPage.grid.productCards.getElements();
	const price = await CatalogPage.grid.getProductPriceAsNumber(cards[0]);
	expect(price).toBeLessThanOrEqual(max);
});

Then("no results should be shown", async () => {
	await expect(CatalogPage.grid.noResults).toBeDisplayed();
});
