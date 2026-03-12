import { Page } from "@playwright/test";
import { MapFeature } from "../../../features/map.feature";

export class T03Operations {
  constructor(
    private readonly page: Page,
    private readonly MapFeature: MapFeature,
  ) {}

  async step1() {
    await this.MapFeature.mapButtonSentinel.click();
  }
  async step2() {
    await this.MapFeature.filterSentinel.click();
  }

  async step3(elementID: string) {
    await this.page.getByTestId(elementID).click();
  }
}
