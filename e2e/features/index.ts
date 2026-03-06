import { Page } from "@playwright/test";
import { LoginFeature } from "./login.feature";
import { MapFeature } from "./map.feature";

export const getFeatures = (page: Page) => ({
    LoginFeature: new LoginFeature(page),
    MapFeature: new MapFeature(page),
})   