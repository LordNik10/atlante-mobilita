import fs from "fs";
import path from "path";
import { chromium } from "playwright";
import { getFeatures } from "./features";


async function globalSetup() {
  const envPath = path.resolve(process.cwd(), ".env");
  try {
    const dotenv = await import("dotenv");
    dotenv.config({ path: envPath });
  } catch {
  }

  const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
  const E2E_EMAIL = process.env.E2E_EMAIL;
  const E2E_PASSWORD = process.env.E2E_PASSWORD;

  if (!E2E_EMAIL || !E2E_PASSWORD) {
    throw new Error(
      "Missing E2E_EMAIL and/or E2E_PASSWORD environment variables for Playwright E2E auth setup."
    );
  }

  const authFile = path.join(process.cwd(), "e2e", ".auth", "user.json");
  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle", timeout: 60000 });
  const { LoginFeature } = getFeatures(page);
  await LoginFeature.login(E2E_EMAIL, E2E_PASSWORD);
  await context.storageState({ path: authFile });
  await browser.close();
}

export default globalSetup;
