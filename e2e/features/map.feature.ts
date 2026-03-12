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
  get filterPriorityHighSentinel() {
    return this.page.getByTestId("priority-filter-high");
  }
  get filterPriorityMediumSentinel() {
    return this.page.getByTestId("priority-filter-medium");
  }
  get filterPriorityLowSentinel() {
    return this.page.getByTestId("priority-filter-low");
  }
  get filterPriorityUrgentSentinel() {
    return this.page.getByTestId("priority-filter-urgent");
  }
  get allReportCardSentinel() {
    return this.page.locator("div[data-testid^='report-card-']");
  }
  get hubSentinel() {
    return this.page.getByText("Hub", { exact: true });
  }
  get hubTitleTestID() {
    return "hub-title-";
  }
  get hubServicesTestID() {
    return "hub-services-";
  }
  get hubMarkersTestID() {
    return "hub-mark-";
  }
  get titleModalSentinel() {
    return this.page.locator("#title");
  }
  get descriptionModalSentinel() {
    return this.page.locator("#description");
  }
  get reportSentinel() {
    return this.page.getByText("Segnalazioni", { exact: true });
  }
  get markerReportTestID() {
    return "report-mark-";
  }
  get loginLinkSentinel() {
    return this.page.getByTestId("login-link");
  }
  get loginCardSentinel() {
    return this.page.getByTestId("login-card");
  }
  get mapButtonSentinel() {
    return this.page.getByTestId("map-button");
  }
  get hubCardSentinel() {
    return this.page.getByTestId("hub-card");
  }
}
