import { Page } from "@playwright/test";

export class T05Operations {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async step1() {
    await this.page.getByTestId("map-button").click();
  }
  async step2(hubID: string) {
    await this.page.getByTestId(`hub-mark-${hubID}`).click();
  }
}
