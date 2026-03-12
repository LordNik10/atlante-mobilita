import { MapFeature } from "../../../features/map.feature";

export class T02Operations {
  constructor(private readonly MapFeature: MapFeature) {}

  async step1() {
    await this.MapFeature.mapButtonSentinel.click();
  }
  async step2() {
    await this.MapFeature.filterSentinel.click();
  }
}
