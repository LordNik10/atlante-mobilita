import { getFeatures } from "@/e2e/features";
import { createStepCounter } from "@/e2e/utils";
import { test } from "@/fixtures";
import { T04Checks } from "./T04Checks";
import { T04Operations } from "./T04Operations";
test("Select High Priority", async ({ authPage }) => {
  const { MapFeature } = getFeatures(authPage);
  const stepCounter = createStepCounter();

  const operations = new T04Operations(authPage, MapFeature);
  const checks = new T04Checks(authPage, MapFeature);

  await test.step(stepCounter("Navigate to map"), async () => {
    await operations.step1();
    await checks.step1();
  });

  await test.step(stepCounter("Click on filter button"), async () => {
    await operations.step2();
    await checks.step2();
  });

  await test.step(stepCounter("Click on priority filter"), async () => {
    await operations.step3();
    await checks.step3();
  });

  await test.step(stepCounter("Select high priority"), async () => {
    await operations.step4();
    await checks.step4();
  });
});
