import { Page } from "@playwright/test";
import { MapFeature } from "../../../features/map.feature";

export class T03Operations {
  private page: Page;
  private MapFeature: MapFeature;
  constructor(page: Page, MapFeature: MapFeature) {
    this.page = page;
    this.MapFeature = MapFeature;
  }

  async step1() {
    await this.page.getByTestId("map-button").click();
  }
  async step2() {
    await this.MapFeature.filterSentinel.click();
  }

  async step3(elementID: string) {
    await this.page.getByTestId(elementID).click();
  }
}
