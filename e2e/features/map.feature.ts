import { Page } from "@playwright/test";

export class MapFeature {
  constructor(private readonly page: Page) {}
  get filterSentinel() {
    return this.page.getByTestId("filter-button");
  }
  get searchSentinel() {
    return this.page.getByTestId("report-search-input");
  }
  get filterPrioritySentinel() {
    return this.page.getByTestId("priority-filter-select");
  }
  get hubSentinel() {
    return this.page.getByText("Hub", { exact: true });
  }
  get reportSentinel() {
    return this.page.getByText("Segnalazioni", { exact: true });
  }
  get mapButtonSentinel() {
    return this.page.getByTestId("map-button");
  }
  get hubCardSentinel() {
    return this.page.getByTestId("hub-card");
  }
}
