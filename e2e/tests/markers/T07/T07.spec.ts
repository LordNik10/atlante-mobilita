import { getFeatures } from "@/e2e/features";
import { createStepCounter } from "@/e2e/utils";
import { test } from "@/fixtures";
import { T07Checks } from "./T07Checks";
import { T07Operations } from "./T07Operations";

test("User must be logged to create report", async ({ notAuthPage }) => {
  const stepCounter = createStepCounter();
  const { MapFeature } = getFeatures(notAuthPage);
  const operations = new T07Operations(notAuthPage, MapFeature);
  const checks = new T07Checks(notAuthPage, MapFeature);

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
