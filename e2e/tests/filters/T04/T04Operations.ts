import { MapFeature } from "../../../features/map.feature";

export class T04Operations {
  constructor(private readonly MapFeature: MapFeature) {}

  async step1() {
    await this.MapFeature.mapButtonSentinel.click();
  }
  async step2() {
    await this.MapFeature.filterSentinel.click();
  }

  async step3() {
    await this.MapFeature.filterPrioritySentinel.click();
  }

  async step4() {
    await this.MapFeature.filterPriorityHighSentinel.click();
  }
}
