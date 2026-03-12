import { expect, Page } from "@playwright/test";
import { MapFeature } from "../../../features/map.feature";

export class T07Checks {
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
    await expect(this.page.locator("h2[data-slot='dialog-title']")).toHaveText(
      "Nuova Segnalazione",
    );
    await expect(this.MapFeature.loginLinkSentinel).toBeVisible();
  }

  async step3() {
    await expect(this.MapFeature.loginCardSentinel).toBeVisible({
      timeout: 20000,
    });
  }
}
