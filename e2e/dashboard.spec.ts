import { test, expect } from "@playwright/test";

test.describe("Dashboard Application", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the dashboard home page", async ({ page }) => {
    // Check if we're redirected to /home
    await expect(page).toHaveURL("/home");

    // Check main heading
    await expect(
      page.getByRole("heading", { name: "Dashboard Home" })
    ).toBeVisible();

    // Check description text
    await expect(
      page.getByText("Navigate using the sidebar to view user data")
    ).toBeVisible();

    // Check dashboard cards
    await expect(page.getByText("Total Users")).toBeVisible();
    await expect(page.getByText("100")).toBeVisible();
    await expect(page.getByText("API Source")).toBeVisible();
    await expect(page.getByText("DummyJSON API")).toBeVisible();
    await expect(page.getByText("Features")).toBeVisible();
  });

  test("should have working sidebar navigation", async ({ page }) => {
    // Check sidebar title
    await expect(
      page.getByRole("heading", { name: "Dashboard" })
    ).toBeVisible();

    // Check navigation links
    const homeLink = page.getByRole("link", { name: /home/i });
    const dataLink = page.getByRole("link", { name: /user data/i });

    await expect(homeLink).toBeVisible();
    await expect(dataLink).toBeVisible();

    // Navigate to data page
    await dataLink.click();
    await expect(page).toHaveURL("/data");

    // Navigate back to home
    await homeLink.click();
    await expect(page).toHaveURL("/home");
  });

  test("should navigate to data page via button", async ({ page }) => {
    // Click the "Go to Data Page" button
    await page.getByRole("link", { name: /go to data page/i }).click();

    // Should navigate to data page
    await expect(page).toHaveURL("/data");
    await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();
  });

  test("should be responsive on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that sidebar shows only "D" on mobile
    await expect(page.getByText("Dashboard")).toBeHidden();
    await expect(page.getByText("D")).toBeVisible();

    // Check that navigation still works
    await page.getByRole("link", { name: /user data/i }).click();
    await expect(page).toHaveURL("/data");
  });
});
