import { getFeatures } from "@/e2e/features";
import { test } from "@/fixtures";
import { expect } from "@playwright/test";

test("Login", async ({ authPage }) => {
  const { MapFeature } = getFeatures(authPage);
  await expect(MapFeature.mapButtonSentinel).toBeVisible({ timeout: 10000 });
});
