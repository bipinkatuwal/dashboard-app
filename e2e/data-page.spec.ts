import { test, expect } from "@playwright/test";

test.describe("Data Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/data");
  });

  test("should load and display user data", async ({ page }) => {
    // Check page title
    await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();

    // Check search input
    await expect(page.getByPlaceholder("Search users...")).toBeVisible();

    // Wait for data to load (check for loading state first, then data)
    await expect(page.locator(".animate-pulse")).toBeVisible();

    // Wait for data to appear
    await expect(page.locator("table")).toBeVisible({ timeout: 10000 });

    // Check table headers
    await expect(
      page.getByRole("columnheader", { name: "Avatar" })
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Name" })
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Email" })
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Phone" })
    ).toBeVisible();

    // Check that user data is displayed
    await expect(page.locator("tbody tr")).toHaveCount(10); // Should show 10 users per page
  });

  test("should filter users with search functionality", async ({ page }) => {
    // Wait for data to load
    await expect(page.locator("table")).toBeVisible({ timeout: 10000 });

    // Get initial row count
    const initialRows = await page.locator("tbody tr").count();
    expect(initialRows).toBeGreaterThan(0);

    // Search for a specific user
    const searchInput = page.getByPlaceholder("Search users...");
    await searchInput.fill("Emily");

    // Wait a bit for the search to filter
    await page.waitForTimeout(500);

    // Check that results are filtered (should be fewer rows)
    const filteredRows = await page.locator("tbody tr").count();
    expect(filteredRows).toBeLessThanOrEqual(initialRows);

    // Clear search
    await searchInput.clear();
    await page.waitForTimeout(500);

    // Should show all users again
    const clearedRows = await page.locator("tbody tr").count();
    expect(clearedRows).toBe(initialRows);
  });

  test("should handle pagination", async ({ page }) => {
    // Wait for data to load
    await expect(page.locator("table")).toBeVisible({ timeout: 10000 });

    // Check pagination controls
    await expect(page.getByText(/Page \d+ of \d+/)).toBeVisible();
    await expect(page.getByRole("button", { name: "Prev" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Next" })).toBeVisible();

    // Check that Prev button is disabled on first page
    await expect(page.getByRole("button", { name: "Prev" })).toBeDisabled();

    // Click Next button
    await page.getByRole("button", { name: "Next" }).click();

    // Wait for new data to load
    await page.waitForTimeout(1000);

    // Check that we're on page 2
    await expect(page.getByText("Page 2 of")).toBeVisible();

    // Check that Prev button is now enabled
    await expect(page.getByRole("button", { name: "Prev" })).toBeEnabled();

    // Go back to page 1
    await page.getByRole("button", { name: "Prev" }).click();
    await page.waitForTimeout(1000);

    // Should be back on page 1
    await expect(page.getByText("Page 1 of")).toBeVisible();
  });

  test("should display error message when API fails", async ({ page }) => {
    // Intercept API calls and make them fail
    await page.route("**/users*", (route) => {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      });
    });

    // Reload the page to trigger the failed API call
    await page.reload();

    // Should show error message
    await expect(page.getByText(/failed to fetch/i)).toBeVisible({
      timeout: 10000,
    });
  });

  test('should show "No users found" when search returns empty results', async ({
    page,
  }) => {
    // Wait for data to load
    await expect(page.locator("table")).toBeVisible({ timeout: 10000 });

    // Search for something that won't match any users
    const searchInput = page.getByPlaceholder("Search users...");
    await searchInput.fill("zzzznonexistentuser");

    // Wait for search to process
    await page.waitForTimeout(500);

    // Should show "No users found" message
    await expect(page.getByText("No users found.")).toBeVisible();
  });

  test("should display user avatars and information correctly", async ({
    page,
  }) => {
    // Wait for data to load
    await expect(page.locator("table")).toBeVisible({ timeout: 10000 });

    // Check that avatars are displayed
    const avatars = page.locator("tbody img");
    await expect(avatars.first()).toBeVisible();

    // Check that user information is displayed in correct format
    const firstRow = page.locator("tbody tr").first();

    // Should have email format
    await expect(firstRow.locator("td").nth(2)).toContainText("@");

    // Should have phone number
    await expect(firstRow.locator("td").nth(3)).not.toBeEmpty();

    // Should have company information
    await expect(firstRow.locator("td").nth(6)).not.toBeEmpty();

    // Should have address information
    await expect(firstRow.locator("td").nth(7)).not.toBeEmpty();
  });
});
