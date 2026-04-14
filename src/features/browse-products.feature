Feature: Browse products
  Customers can explore the product catalog by searching,
  filtering, sorting and navigating through pages.
  # GRID

  Scenario: UC-1 Grid: Display products in the catalog
    Given the customer is on the products page
    When the product grid container is displayed
    Then products should be visible in the catalog
    And each product should display a name
    And each product should display a price
    And each product should display an image
    And each product should display CO2 rating
  # SIDEBAR - SORT

  Scenario Outline: UC-2 Sidebar | Sort: Arrange products by different criteria
    Given the customer is on the products page
    When the customer sorts the products by "<sort_option>"
    Then the products should be displayed in "<sort_order>" order

    Examples:
      | sort_option    | sort_order         |
      | name,asc       | alphabetical A-Z   |
      | name,desc      | alphabetical Z-A   |
      | price,desc     | price descending   |
      | price,asc      | price ascending    |
      | co2_rating,asc | CO2 efficiency A-E |
      | o2_rating,desc | CO2 efficiency E-A |
  # SIDEBAR - PRICE RANGE

  Scenario Outline: UC-3 Sidebar | Price Range: Filter by minimum and maximum price limits
    Given the customer is on the products page
    When the customer sets the price slider from <min> to <max>
    Then the price labels should display the range <min> to <max>
    And all displayed products should have a price between <min> to <max>

    Examples:
      | min | max | description            |
      |   0 |  50 | Lower boundary         |
      | 150 | 200 | Upper boundary         |
      |   1 | 199 | Just inside boundaries |
      |  40 | 160 | Mid-Range              |

  Scenario: UC-4 Sidebar | Price Range: Verify "No results" state for out-of-bounds prices
    Given the customer is on the products page
    When the customer sets the price slider from 1 to 3
    Then the price labels should display the range 1 to 3
    And no results should be shown
  # SIDEBAR - SEARCH

  Scenario Outline: UC-5 Sidebar | Search: Filter the product catalog using valid keywords
    Given the customer is on the products page
    When the customer searches for "<search_term>"
    Then the search results header should display "<search_term>"
    And all displayed products should contain "<search_term>" in their name

    Examples:
      | search_term        | description                  |
      | Hammer             | Standard term - Title Case   |
      | hammer             | Case sensitivity - Lowercase |
      | HAMMER             | Case sensitivity - Uppercase |
      | Combination Pliers | Multi-word term              |
      |                12V | Alphanumeric term            |

  Rule: Search terms must be between 3 and 40 characters

    Scenario Outline: UC-6 Sidebar | Search: Accept search terms within valid boundaries
      Given the customer is on the products page
      When the customer searches for "<search_term>"
      Then the search results header should display "Searched for: <search_term>"

      Examples:
        | search_term                              | length | description        |
        | Saw                                      |      3 | Minimum boundary   |
        | Bolt                                     |      4 | Just above minimum |
        | Adjustable Spanner                       |     19 | Mid-range nominal  |
        | Small Bench Saw with 200mm Safety Blade  |     39 | Just below maximum |
        | Small Bench Saw with 200mm Safety Blades |     40 | Maximum boundary   |

    Scenario Outline: UC-7 Sidebar | Search: Reject search terms outside length limits
      Given the customer is on the products page
      And the product grid is displayed
      When the customer searches for "<search_term>"
      Then the product grid should not update results

      Examples:
        | search_term                                | length | description        |
        | Pl                                         |      2 | Just below minimum |
        | Cordless Drill Combo Kit With 2 Batteries! |     41 | Just above maximum |

    Scenario Outline: UC-8 Sidebar | Search: New search resets all active filters
      Given the customer is on the products page
      And the product grid is displayed
      And the customer filters by category "<category>"
      And the customer filters by brand "<brand>"
      And the customer filters by sustainability "<sustainability>"
      When the customer searches for "<search_term>"
      Then the search results header should display "Searched for: <search_term>"
      And the search results should ignore previous filters
      And the category "<category>" should be unselected
      And the brand "<brand>" should be unselected
      And the sustainability "<sustainability>" should be unselected

      Examples:
        | category   | brand                | sustainability                  | search_term |
        | Hand Tools | ForgeFlex Tools      | Show only eco-friendly products | Hammer      |
        | Grinder    | MightyCraft Hardware | Show only eco-friendly products | Drill       |

    Scenario: UC-9 Sidebar | Search: Restore the original product view by clearing the search
      Given the customer is on the products page
      And the customer searches for "Hammer"
      And the product grid shows only results matching "Hammer"
      When the customer clicks the "clear" button in the search bar
      Then the search input should be empty
      And the product grid should be reset to show all products
  # SIDEBAR - FILTERS

    Scenario Outline: UC-10 Sidebar | Filters: Select independent filters for <filter_group>
      Given the customer is on the products page
      When the customer selects the "<value>" checkbox from the "<filter_group>" section
      Then the "<value>" checkbox should be marked as selected
      And the product grid should display all items belonging to "<value>"

      Examples:
        | filter_group | value     |
        | By Brand     | ForgeFlex |
        | By Category  | Hammer    |

    Scenario Outline: UC-11 Sidebar | Category: Sync selection between parent and subcategories
      Given the customer is on the products page
      When the customer selects the "<value>" checkbox from the "<filter_group>" section
      Then the "<value>" checkbox should be marked as selected
      And all "<subcategories>" under "<value>" should be automatically selected
      And the product grid should display all items belonging to "<value>"

      Examples:
        | value       | subcategories                                                | filter_group |
        | Hand Tools  | Hammer,Hand Saw,Wrench,Screwdriver,Pliers,Chisels,Measures   | By Category  |
        | Power Tools | Grinder,Sander,Saw,Drill                                     | By Category  |
        | Other       | Tool Belts,Storage Solutions,Workbench,Safety Gear,Fasteners | By Category  |
  # PAGINATION

    Scenario: UC-12 Pagination: Navigate directly to a specific page number
      Given the customer is on the products page
      When the customer clicks on the page number button "2"
      Then the pagination control for page "2" should be active
      And the product grid should display the next set of items

    Scenario Outline: UC-13 Grid | Pagination: Browse through product pages using arrows
      Given the customer is on the products page
      And the customer is on page "<current_page>"
      When the customer clicks on the "<arrow>" arrow button
      Then the page number "<target_page>" should be active
      And the product grid should display the next set of items

      Examples:
        | current_page | arrow    | target_page | description         |
        |            1 | next     |           2 | Forward navigation  |
        |            3 | next     |           4 | Forward navigation  |
        |            2 | previous |           1 | Backward navigation |
        |            4 | previous |           3 | Backward navigation |

    Scenario Outline: UC-14 Grid | Pagination: Handle arrow states at the start and end of results
      Given the customer is on the products page
      And the customer is on the "<page_position>" page of the catalog
      When the pagination controls are displayed
      Then the "<arrow>" arrow button should be disabled

      Examples:
        | page_position | arrow    |
        | first         | previous |
        | last          | next     |
  # NAV. BAR - CATEGORIES

    Scenario Outline: UC-15 Nav. Bar | Categories: Verify product results when selecting a category
      Given the customer is on the products page
      When the customer selects "<category>" from the "Categories" navigation dropdown
      Then the header shown is "Category: <category>"
      And the products shown should belong to "<category>"
      And the side menu in "By Category" should only show the related filters for "<category>"

      Examples:
        | category    |
        | Hand Tools  |
        | Power Tools |
        | Other       |
