import { Page } from "@playwright/test";
import { MapFeature } from "../../../features/map.feature";

export class T04Operations {
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

  async step3() {
    await this.page.getByTestId("priority-filter-select").click();
  }

  async step4() {
    await this.page.getByTestId("priority-filter-high").click();
  }
}
