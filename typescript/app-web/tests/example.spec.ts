import { test, expect } from "@playwright/test";

test("homepage has title and links to intro page", async ({ page }) => {
	await page.goto("https://playwright.dev/");

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Playwright/);

	// create a locator
	const getStarted = page.getByRole("link", { name: "Get started" });

	// Expect an attribute "to be strictly equal" to the value.
	await expect(getStarted).toHaveAttribute("href", "/docs/intro");

	// Click the get started link.
	await getStarted.click();

	// Expects the URL to contain intro.
	await expect(page).toHaveURL(/.*intro/);
});

test("vita", async ({ page }) => {
	await page.goto("http://localhost:5173/");

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Oyelowo App/);

	// create a locator
	const getStarted = page.getByRole("link", { name: "1 New Invoice" });
	// const getStarted = page.getByRole("link", { name: "Get started" });

	// // Expect an attribute "to be strictly equal" to the value.
	await expect(getStarted).toHaveAttribute(
		"href",
		"/dashboard/invoices$invoiceId",
	);

	// // Click the get started link.
	await getStarted.click();

	// // Expects the URL to contain intro.
	// await expect(page).toHaveURL(/.*/);
	await expect(page).toHaveURL(/.*invoiceId/);
});
