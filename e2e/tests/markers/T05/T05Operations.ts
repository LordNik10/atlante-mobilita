import { Page } from "@playwright/test";
import { MapFeature } from "../../../features/map.feature";

export class T05Operations {
  private page: Page;
  private MapFeature: MapFeature;
  constructor(page: Page, MapFeature: MapFeature) {
    this.page = page;
    this.MapFeature = MapFeature;
  }

  async step1() {
    await this.page.getByTestId("map-button").click();
  }
  async step2(hubID: string) {
    await this.page.getByTestId(`hub-mark-${hubID}`).click();
  }
}
