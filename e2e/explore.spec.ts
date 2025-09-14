import { test, expect } from "@playwright/test";

test("Just visit", async ({ page }) => {
  await page.goto("http://localhost:4173?month=3&year=2026");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/عداد الميري/);
});
