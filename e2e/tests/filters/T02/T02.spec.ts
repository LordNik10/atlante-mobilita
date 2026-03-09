import { getFeatures } from "@/e2e/features";
import { test } from "@/fixtures";
import { T02Checks } from "./T02Checks";
import { T02Operations } from "./T02Operations";
import { createStepCounter } from "@/e2e/utils";
test("Filters", async ({ authPage }) => {
  const stepCounter = createStepCounter();
  const { MapFeature } = getFeatures(authPage);
  const operations = new T02Operations(authPage, MapFeature);
  const checks = new T02Checks(authPage, MapFeature);

  await test.step(stepCounter("Navigate to map"), async () => {
    await operations.step1();
    await checks.step1();
  });
  await test.step(stepCounter("Click on filter button"), async () => {
    await operations.step2();
    await checks.step2();
  });
});
