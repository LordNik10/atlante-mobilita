import { getFeatures } from "@/e2e/features";
import { test } from "@/fixtures";
import { createStepCounter } from "@/e2e/utils";
import { T06Operations } from "./T06Operations";
import { T06Checks } from "./T06Checks";

test("Select Marker Hub", async ({ authPage }) => {
  const responsePromise = authPage.waitForResponse("**/api/report/create");

  const stepCounter = createStepCounter();
  const { MapFeature } = getFeatures(authPage);
  const operations = new T06Operations(authPage);
  const checks = new T06Checks(authPage, MapFeature);

  await test.step(stepCounter("Navigate to map"), async () => {
    await operations.step1();
    await checks.step1();
  });
  await test.step(stepCounter("Click on hub marker"), async () => {
    await operations.step2();
    await checks.step2();
  });

  await test.step(stepCounter("Create report"), async () => {
    await operations.step3("Test Title", "Test Description");
    const response = await responsePromise;
    const responseBody = await response.json();
    const reportID = responseBody.id;
    console.log("Created report ID:", reportID);
    await checks.step3(reportID);
  });
});
