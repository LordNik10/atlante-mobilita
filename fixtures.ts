import { Page, test as base } from "@playwright/test";

export const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

type MyFixtures = {
  authPage: Page;
  notAuthPage: Page;
};

export const test = base.extend<MyFixtures>({
  authPage: async ({ page }, runWithPage) => {
    await page.goto(BASE_URL);
    await runWithPage(page);
  },

  notAuthPage: async ({ browser }, runWithPage) => {
    const context = await browser.newContext({ storageState: undefined });
    const page = await context.newPage();
    await page.goto(BASE_URL);
    await runWithPage(page);
    await context.close();
  },
});
