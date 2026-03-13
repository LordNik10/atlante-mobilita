import fs from "fs";
import path from "path";
import { test as setup } from "@playwright/test";
import { getFeatures } from "./features";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const E2E_EMAIL = process.env.E2E_EMAIL;
const E2E_PASSWORD = process.env.E2E_PASSWORD;

if (!E2E_EMAIL || !E2E_PASSWORD) {
  throw new Error(
    "Missing E2E_EMAIL and/or E2E_PASSWORD environment variables for Playwright E2E auth setup."
  );
}

const authFile = path.join(process.cwd(), "e2e", ".auth", "user.json");

setup("authenticate", async ({ page }) => {
  await page.goto(`${BASE_URL}/login`);
  const { LoginFeature } = getFeatures(page);
  await LoginFeature.login(E2E_EMAIL, E2E_PASSWORD);

  const authDir = path.dirname(authFile);
  fs.mkdirSync(authDir, { recursive: true });
  await page.context().storageState({ path: authFile });
});
