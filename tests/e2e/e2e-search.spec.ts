import { test, expect } from "@playwright/test";
import { HomePage } from "../../page_objects/old/HomePage";
import { SearchPage } from "../../page_objects/old/SearchPage";

test.describe.parallel("Search Results", () => {
  let homePage: HomePage;
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    await homePage.visit();
  });

  test("Should find search results", async ({ page }) => {
    await homePage.searchForPhrase("bank");
    await searchPage.assertTable(2);
  });

  test("Should not find search results", async ({ page }) => {
    await homePage.searchForPhrase("deez");
    await searchPage.assertTable(0);
  });
});
