// import { afterAll, beforeAll, describe, test } from "vitest";
// import { preview } from "vite";
// import type { PreviewServer } from "vite";
// import type { Page, Browser } from "@playwright/test";
// import { expect, chromium } from "@playwright/test";

// describe("basic", async () => {
// 	let server: PreviewServer;
// 	let browser: Browser;
// 	let page: Page;

// 	beforeAll(async () => {
// 		server = await preview({ preview: { port: 5173 } });
// 		browser = await chromium.launch();
// 		page = await browser.newPage();
// 	});

// 	afterAll(async () => {
// 		await browser.close();
// 		await new Promise<void>((resolve, reject) => {
// 			server.httpServer.close((error) => (error ? reject(error) : resolve()));
// 		});
// 	});

// 	test("should change count when button clicked", async () => {
// 		await page.goto("http://localhost:5173/");
// 		const button = page.getByRole("button", { name: /Clicked/ });
// 		await expect(button).toBeVisible();

// 		await expect(button).toHaveText("Clicked 0 time(s)");

// 		await button.click();
// 		await expect(button).toHaveText("Clicked 1 time(s)");
// 	}, 60_000);
// });
