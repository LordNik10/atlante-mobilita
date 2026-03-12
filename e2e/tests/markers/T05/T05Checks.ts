import { expect, Page } from "@playwright/test";
import { MapFeature } from "../../../features/map.feature";

export class T05Checks {
  constructor(
    private readonly page: Page,
    private readonly MapFeature: MapFeature,
  ) {}

  async step1() {
    await expect(this.MapFeature.filterSentinel).toBeVisible({
      timeout: 10000,
    });
  }
  async step2(hubID: string) {
    await expect(
      this.page.getByTestId(`${this.MapFeature.hubTitleTestID}${hubID}`),
    ).toHaveText("hub 1");
    await expect(
      this.page.getByTestId(`${this.MapFeature.hubServicesTestID}${hubID}`),
    ).toHaveText("monopattini bici elettriche");
  }
}
