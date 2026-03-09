import { Page } from "@playwright/test";

export class T06Operations {
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

  async step3(title: string, description: string) {
    await this.page.locator("#title").fill(title);
    await this.page.locator("#description").fill(description);
    await this.page.getByRole("button", { name: "Submit" }).click();
  }
}
