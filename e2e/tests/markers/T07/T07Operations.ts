import { Page } from "@playwright/test";

export class T07Operations {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async step1() {
    await this.page.getByTestId("map-button").click();
  }
  async step2() {
    await this.page.locator(`.leaflet-container`).click();
  }

  async step3() {
    await this.page.getByTestId("login-link").click();
  }
}
