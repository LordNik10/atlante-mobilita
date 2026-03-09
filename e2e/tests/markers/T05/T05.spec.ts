import { getFeatures } from "@/e2e/features";
import { test } from "@/fixtures";
import { createStepCounter } from "@/e2e/utils";
import { T05Operations } from "./T05Operations";
import { T05Checks } from "./T05Checks";

const hubID = "27d85b6b-885c-41b1-b7ff-c874c952de86";

test("Select Marker Hub", async ({ authPage }) => {
  const stepCounter = createStepCounter();
  const { MapFeature } = getFeatures(authPage);
  const operations = new T05Operations(authPage);
  const checks = new T05Checks(authPage, MapFeature);

  await test.step(stepCounter("Navigate to map"), async () => {
    await operations.step1();
    await checks.step1();
  });
  await test.step(stepCounter("Click on hub marker"), async () => {
    await operations.step2(hubID);
    await checks.step2(hubID);
  });
});
