import { expect, Page } from "@playwright/test";
import { MapFeature } from "../../../features/map.feature";

export class T04Checks {
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
    await expect(this.MapFeature.searchSentinel).toBeVisible();
    await expect(this.MapFeature.filterPrioritySentinel).toBeVisible();
    await expect(this.MapFeature.hubSentinel).toBeVisible();
    await expect(this.MapFeature.reportSentinel).toBeVisible();
  }

  async step3() {
    await expect(this.page.getByTestId("priority-filter-low")).toBeVisible();
    await expect(this.page.getByTestId("priority-filter-medium")).toBeVisible();
    await expect(this.page.getByTestId("priority-filter-high")).toBeVisible();
    await expect(this.page.getByTestId("priority-filter-urgent")).toBeVisible();
  }
  async step4() {
    const reportsCard = await this.page
      .locator("div[data-testid^='report-card-']")
      .all();
    console.log("reportsCard", reportsCard);
    reportsCard.forEach(async (report) => {
      console.log(
        "report",
        await report.getByTestId("report-card-priority").textContent(),
      );
      await expect(report.getByTestId("report-card-priority")).toHaveText(
        "high",
      );
    });
  }
}
