import { test, expect } from "@playwright/test";

test("Invoice page", async ({ page }) => {
	await page.goto("http://localhost:5173/");

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Oyelowo App/);

	// create a locator
	const getStarted = page.getByRole("link", { name: "1 New Invoice" });

	// Expect an attribute "to be strictly equal" to the value.
	await expect(getStarted).toHaveAttribute(
		"href",
		"/dashboard/invoices$invoiceId",
	);

	// Click the get started link.
	await getStarted.click();

	// Expects the URL to contain intro.
	await expect(page).toHaveURL(/.*invoiceId/);
});
