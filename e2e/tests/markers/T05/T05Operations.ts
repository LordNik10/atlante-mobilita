import { MapFeature } from "@/e2e/features/map.feature";
import { Page } from "@playwright/test";

export class T05Operations {
  constructor(
    private page: Page,
    private MapFeature: MapFeature,
  ) {}

  async step1() {
    await this.MapFeature.mapButtonSentinel.click();
  }
  async step2(hubID: string) {
    await this.page.getByTestId(`hub-mark-${hubID}`).click();
  }
}
