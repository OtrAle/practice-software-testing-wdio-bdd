import CatalogPage from "../../src/page-objects/pages/catalog.page.js";
import { Given } from "@cucumber/cucumber";

Given("the customer is on the products page", async () => {
	await CatalogPage.open();
});
