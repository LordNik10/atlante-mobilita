import { expect } from "@playwright/test";
import { MapFeature } from "../../../features/map.feature";

export class T04Checks {
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

  async step3() {
    await expect(this.MapFeature.filterPriorityLowSentinel).toBeVisible();
    await expect(this.MapFeature.filterPriorityMediumSentinel).toBeVisible();
    await expect(this.MapFeature.filterPriorityHighSentinel).toBeVisible();
    await expect(this.MapFeature.filterPriorityUrgentSentinel).toBeVisible();
  }
  async step4() {
    await expect(
      this.MapFeature.allReportCardSentinel
        .first()
        .getByTestId("report-card-priority"),
    ).toHaveText("high", { timeout: 10000 });

    const reportsCard = await this.MapFeature.allReportCardSentinel.all();

    for (const report of reportsCard) {
      await expect(report.getByTestId("report-card-priority")).toHaveText(
        "high",
        { timeout: 10000 },
      );
    }
  }
}
