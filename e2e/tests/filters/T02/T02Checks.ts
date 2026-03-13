import { expect } from "@playwright/test";
import { MapFeature } from "../../../features/map.feature";

export class T02Checks {
  constructor(private readonly MapFeature: MapFeature) {}

  async step1() {
    await expect(this.MapFeature.filterSentinel).toBeVisible({
      timeout: 10000,
    });
  }
  async step2() {
    await expect(this.MapFeature.searchSentinel).toBeVisible({ timeout: 10000 });
    await expect(this.MapFeature.filterPrioritySentinel).toBeVisible();
    await expect(this.MapFeature.hubSentinel).toBeVisible();
    await expect(this.MapFeature.reportSentinel).toBeVisible();
  }
}
