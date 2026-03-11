import { getFeatures } from "@/e2e/features";
import { test } from "@/fixtures";
import { T03Operations } from "./T03Operations";
import { createStepCounter } from "@/e2e/utils";
import { T03Checks } from "./T03Checks";
test("Select Hub", async ({ authPage }) => {
  const { MapFeature } = getFeatures(authPage);
  const stepCounter = createStepCounter();

  const operations = new T03Operations(authPage, MapFeature);
  const checks = new T03Checks(authPage, MapFeature);

  await test.step(stepCounter("Navigate to map"), async () => {
    await operations.step1();
    await checks.step1();
  });

  await test.step(stepCounter("Click on filter button"), async () => {
    await operations.step2();
    await checks.step2();
  });

  await test.step(stepCounter("Click on hub card"), async () => {
    await operations.step3("hub-card-27d85b6b-885c-41b1-b7ff-c874c952de86");
    await checks.step3();
  });
});
