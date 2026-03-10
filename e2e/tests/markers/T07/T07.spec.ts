import { getFeatures } from "@/e2e/features";
import { BASE_URL, test } from "@/fixtures";
import { createStepCounter } from "@/e2e/utils";
import { T07Operations } from "./T07Operations";
import { T07Checks } from "./T07Checks";

test("User must be logged to create report", async ({ page }) => {
  await page.goto(BASE_URL);
  const stepCounter = createStepCounter();
  const { MapFeature } = getFeatures(page);
  const operations = new T07Operations(page);
  const checks = new T07Checks(page, MapFeature);

  await test.step(stepCounter("Navigate to map"), async () => {
    await operations.step1();
    await checks.step1();
  });
  await test.step(stepCounter("Click on map"), async () => {
    await operations.step2();
    await checks.step2();
  });

  await test.step(stepCounter("Redirect to login"), async () => {
    await operations.step3();
    await checks.step3();
  });
});
