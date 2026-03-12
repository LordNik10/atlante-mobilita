import { MapFeature } from "@/e2e/features/map.feature";
import { Page } from "@playwright/test";

export class T07Operations {
  constructor(
    private readonly page: Page,
    private readonly MapFeature: MapFeature,
  ) {}

  async step1() {
    await this.MapFeature.mapButtonSentinel.click();
  }
  async step2() {
    await this.page.locator(`.leaflet-container`).click();
  }

  async step3() {
    await this.page.getByTestId("login-link").click();
  }
}
