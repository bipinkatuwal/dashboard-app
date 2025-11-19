import { test, expect } from "@playwright/test";

test.describe("Complete User Workflow", () => {
  test("should complete full dashboard workflow", async ({ page }) => {
    // Start at home page
    await page.goto("/");
    await expect(page).toHaveURL("/home");

    // Verify home page content
    await expect(
      page.getByRole("heading", { name: "Dashboard Home" })
    ).toBeVisible();

    // Navigate to data page via sidebar
    await page.getByRole("link", { name: /user data/i }).click();
    await expect(page).toHaveURL("/data");

    // Wait for data to load
    await expect(page.locator("table")).toBeVisible({ timeout: 10000 });

    // Perform search
    const searchInput = page.getByPlaceholder("Search users...");
    await searchInput.fill("John");
    await page.waitForTimeout(500);

    // Verify search results
    const searchResults = await page.locator("tbody tr").count();
    expect(searchResults).toBeGreaterThan(0);

    // Clear search and navigate through pages
    await searchInput.clear();
    await page.waitForTimeout(500);

    // Go to next page
    await page.getByRole("button", { name: "Next" }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText("Page 2 of")).toBeVisible();

    // Go back to previous page
    await page.getByRole("button", { name: "Prev" }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText("Page 1 of")).toBeVisible();

    // Change theme
    const themeButton = page
      .locator("button")
      .filter({ has: page.locator("svg") })
      .first();
    await themeButton.click();
    await page.getByRole("button", { name: "Dark" }).click();

    // Verify dark theme is applied
    await expect(page.locator("html")).toHaveClass(/dark/);

    // Navigate back to home
    await page.getByRole("link", { name: /home/i }).click();
    await expect(page).toHaveURL("/home");

    // Verify theme persisted
    await expect(page.locator("html")).toHaveClass(/dark/);

    // Use the "Go to Data Page" button
    await page.getByRole("link", { name: /go to data page/i }).click();
    await expect(page).toHaveURL("/data");

    // Verify we're back on data page with dark theme
    await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("should handle error states gracefully", async ({ page }) => {
    // Intercept API calls to simulate network failure
    await page.route("**/users*", (route) => {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Server Error" }),
      });
    });

    // Navigate to data page
    await page.goto("/data");

    // Should show error message
    await expect(page.getByText(/failed to fetch/i)).toBeVisible({
      timeout: 10000,
    });

    // Navigation should still work
    await page.getByRole("link", { name: /home/i }).click();
    await expect(page).toHaveURL("/home");

    // Home page should load normally
    await expect(
      page.getByRole("heading", { name: "Dashboard Home" })
    ).toBeVisible();
  });

  test("should work correctly on different screen sizes", async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto("/");

    // Should show full sidebar
    await expect(page.getByText("Dashboard")).toBeVisible();
    await expect(page.getByText("Home")).toBeVisible();
    await expect(page.getByText("User Data")).toBeVisible();

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();

    // Should still show full sidebar on tablet
    await expect(page.getByText("Dashboard")).toBeVisible();

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();

    // Should show collapsed sidebar
    await expect(page.getByText("Dashboard")).toBeHidden();
    await expect(page.getByText("D")).toBeVisible();

    // Navigation should still work on mobile
    await page.getByRole("link", { name: /user data/i }).click();
    await expect(page).toHaveURL("/data");

    // Data table should be scrollable on mobile
    await expect(page.locator("table")).toBeVisible({ timeout: 10000 });

    // Search should work on mobile
    const searchInput = page.getByPlaceholder("Search users...");
    await expect(searchInput).toBeVisible();
    await searchInput.fill("test");
    await page.waitForTimeout(500);
  });

  test("should maintain state across navigation", async ({ page }) => {
    // Go to data page
    await page.goto("/data");
    await expect(page.locator("table")).toBeVisible({ timeout: 10000 });

    // Set a search query
    const searchInput = page.getByPlaceholder("Search users...");
    await searchInput.fill("Emily");
    await page.waitForTimeout(500);

    // Navigate to page 2 (if available)
    const nextButton = page.getByRole("button", { name: "Next" });
    if (await nextButton.isEnabled()) {
      await nextButton.click();
      await page.waitForTimeout(1000);
    }

    // Navigate away and back
    await page.getByRole("link", { name: /home/i }).click();
    await expect(page).toHaveURL("/home");

    await page.getByRole("link", { name: /user data/i }).click();
    await expect(page).toHaveURL("/data");

    // State should be reset (fresh data load)
    await expect(page.locator("table")).toBeVisible({ timeout: 10000 });
    await expect(searchInput).toHaveValue(""); // Search should be cleared
    await expect(page.getByText("Page 1 of")).toBeVisible(); // Should be back to page 1
  });
});
