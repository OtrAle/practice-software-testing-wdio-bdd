# BDD with Cucumber

This repository contains an End-to-End (E2E) automation suite focused on testing the **Browse Products** functionality of the [Practice Software Testing application](https://practicesoftwaretesting.com/). It uses WebdriverIO with Cucumber and follows the **Page Object Model** structure for clarity and scalability.

## Key Features

- **Page Object Model (POM):** Maintains separation between UI elements and test logic, with reusable components for the sidebar, grid, pagination, and navbar.
- **Component-based architecture:** Each UI section (filters, search, sort, price slider, pagination) has its own dedicated component class.
- **Comprehensive catalog coverage:** Validates product display, sorting, filtering, search, pagination, price range, and category navigation.
- **HTML Reports:** An HTML report is automatically generated in the /results folder after each test run, providing a visual summary of passed and failed tests.
- **Test filtering by category:** - **Test filtering by tag:** Tests are organized by test type and by component, enabling targeted test execution.
- **Code Quality Gates:** ESLint enforces code standards with custom rules, Prettier ensures consistent formatting, and Husky with lint-staged automatically runs both on staged files before each commit.

## Requirements

- Node.js
- npm
- Git
- Google Chrome

## Installation

```bash
git clone https://github.com/OtrAle/bdd-cucumber-browse-feature-practice-software-testing
npm install
```

## Execution Commands

Run from the project root directory:

### Test Commands

| Command                         | Description                    |
| ------------------------------- | ------------------------------ |
| `npm run wdio`                  | Runs all browse products tests |
| `npm run wdio:smoke`            | Runs all smoke tests           |
| `npm run wdio:regression`       | Runs all regression tests      |
| `npm run wdio:negative`         | Runs all negative tests        |
| `npm run wdio:grid`             | Runs product grid tests        |
| `npm run wdio:sort`             | Runs sort tests                |
| `npm run wdio:price-range`      | Runs price range tests         |
| `npm run wdio:search`           | Runs search tests              |
| `npm run wdio:checkbox-filters` | Runs checkbox filter tests     |
| `npm run wdio:pagination`       | Runs pagination tests          |
| `npm run wdio:category`         | Runs category navigation tests |

### Code Quality Commands

| Command              | Description                    |
| -------------------- | ------------------------------ |
| `npm run lint`       | Checks for ESLint errors       |
| `npm run lint:fix`   | Auto-fixes ESLint errors       |
| `npm run format`     | Checks Prettier formatting     |
| `npm run format:fix` | Auto-fixes Prettier formatting |

## Test Scenarios Covered

- ✅ UC-1 GRID: Displaying the product grid shows product name, price, image, and CO₂ rating for each product.
- ✅ UC-2 SORT: Selecting a sort option reorders the product grid according to the selected criteria.
- ✅ UC-3 PRICE RANGE: Adjusting the price range slider filters the product grid to show products within the selected range.
- ✅ UC-4 PRICE RANGE: Selecting a price range with no resuls to show"no results" message.
- ✅ UC-5 SEARCH: Entering a valid search term displays matching products in the grid.
- ✅ UC-6 SEARCH: The search input enforces minimum and maximum character length boundaries.
- ✅ UC-7 SEARCH: Entering a search term outside the allowed length boundaries does not trigger a search.
- ✅ UC-8 SEARCH: Performing a new search resets any previously applied filters.
- ✅ UC-9 SEARCH: Clearing the search input restores the default product grid state.
- ✅ UC-10 FILTERS: Selecting checkbox filters updates the product grid accordingly.
- ✅ UC-11 FILTERS: Selecting a parent category checkbox automatically selects its child categories.
- ✅ UC-12 PAGINATION: Clicking a page number navigates directly to the corresponding page.
- ✅ UC-13 PAGINATION: Clicking the pagination arrow buttons navigates to the next or previous page.
- ✅ UC-14 PAGINATION: Pagination arrow buttons are disabled when the first or last page is reached.
- ✅ UC-15 CATEGORIES: Navigating to a category from the navbar updates both the sidebar filters and the product grid.

## Author

Laura Alejandra Hernández Martínez
