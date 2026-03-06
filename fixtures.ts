import { Page, test as base } from "@playwright/test";
import { getFeatures } from "./e2e/features";

const URL = "http://localhost:3000/login";
const E2E_EMAIL = process.env.E2E_EMAIL;
const E2E_PASSWORD = process.env.E2E_PASSWORD;

if (!E2E_EMAIL || !E2E_PASSWORD) {
  throw new Error(
    "Missing E2E_EMAIL and/or E2E_PASSWORD environment variables for Playwright E2E tests."
  );
}

type MyFixtures = {
    authPage: Page;
  };
  

export const test = base.extend<MyFixtures>({
  authPage: async ({ page }, runWithPage) => {
    await page.goto(URL);
    const { LoginFeature } = getFeatures(page);
    await LoginFeature.login(E2E_EMAIL, E2E_PASSWORD);
    await runWithPage(page);
  },
});