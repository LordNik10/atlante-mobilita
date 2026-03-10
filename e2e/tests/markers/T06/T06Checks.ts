import { expect, Page } from "@playwright/test";
import { MapFeature } from "../../../features/map.feature";

export class T06Checks {
  constructor(
    private readonly page: Page,
    private readonly MapFeature: MapFeature,
  ) {}

  async step1() {
    await expect(this.MapFeature.filterSentinel).toBeVisible({
      timeout: 10000,
    });
  }
  async step2() {
    await expect(this.page.locator("div[role='dialog']")).toBeVisible();
  }

  async step3(reportID: string) {
    await expect(this.page.getByTestId(`report-mark-${reportID}`)).toBeVisible({
      timeout: 20000,
    });
  }
}
