import { test, expect } from "@playwright/test";

test.describe("Theme Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have theme toggle button", async ({ page }) => {
    // Check that theme toggle button is visible
    const themeButton = page
      .locator("button")
      .filter({ has: page.locator("svg") })
      .first();
    await expect(themeButton).toBeVisible();
  });

  test("should open theme dropdown when clicked", async ({ page }) => {
    // Click theme toggle button
    const themeButton = page
      .locator("button")
      .filter({ has: page.locator("svg") })
      .first();
    await themeButton.click();

    // Check that dropdown options are visible
    await expect(page.getByRole("button", { name: "Light" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Dark" })).toBeVisible();
    await expect(page.getByRole("button", { name: "System" })).toBeVisible();
  });

  test("should switch to dark theme", async ({ page }) => {
    // Click theme toggle button
    const themeButton = page
      .locator("button")
      .filter({ has: page.locator("svg") })
      .first();
    await themeButton.click();

    // Click Dark theme option
    await page.getByRole("button", { name: "Dark" }).click();

    // Check that dark theme is applied (html should have 'dark' class)
    const htmlElement = page.locator("html");
    await expect(htmlElement).toHaveClass(/dark/);

    // Verify theme persists after page reload
    await page.reload();
    await expect(htmlElement).toHaveClass(/dark/);
  });

  test("should switch to light theme", async ({ page }) => {
    // First set to dark theme
    const themeButton = page
      .locator("button")
      .filter({ has: page.locator("svg") })
      .first();
    await themeButton.click();
    await page.getByRole("button", { name: "Dark" }).click();

    // Now switch to light theme
    await themeButton.click();
    await page.getByRole("button", { name: "Light" }).click();

    // Check that dark class is removed
    const htmlElement = page.locator("html");
    await expect(htmlElement).not.toHaveClass(/dark/);

    // Verify theme persists after page reload
    await page.reload();
    await expect(htmlElement).not.toHaveClass(/dark/);
  });

  test("should close dropdown when clicking outside", async ({ page }) => {
    // Open theme dropdown
    const themeButton = page
      .locator("button")
      .filter({ has: page.locator("svg") })
      .first();
    await themeButton.click();

    // Verify dropdown is open
    await expect(page.getByRole("button", { name: "Light" })).toBeVisible();

    // Click outside the dropdown
    await page.click("body", { position: { x: 100, y: 100 } });

    // Verify dropdown is closed
    await expect(page.getByRole("button", { name: "Light" })).not.toBeVisible();
  });

  test("should respect system theme preference", async ({ page }) => {
    // Set system to prefer dark mode
    await page.emulateMedia({ colorScheme: "dark" });

    // Click theme toggle and select System
    const themeButton = page
      .locator("button")
      .filter({ has: page.locator("svg") })
      .first();
    await themeButton.click();
    await page.getByRole("button", { name: "System" }).click();

    // Should apply dark theme based on system preference
    const htmlElement = page.locator("html");
    await expect(htmlElement).toHaveClass(/dark/);

    // Change system preference to light
    await page.emulateMedia({ colorScheme: "light" });

    // Reload to trigger system theme change
    await page.reload();

    // Should now apply light theme
    await expect(htmlElement).not.toHaveClass(/dark/);
  });
});
