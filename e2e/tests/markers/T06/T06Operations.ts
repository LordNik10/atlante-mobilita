import { MapFeature } from "@/e2e/features/map.feature";
import { Page } from "@playwright/test";

export class T06Operations {
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

  async step3(title: string, description: string) {
    await this.MapFeature.titleModalSentinel.fill(title);
    await this.MapFeature.descriptionModalSentinel.fill(description);
    await this.page.locator('button[type="submit"]').click();
  }
}
