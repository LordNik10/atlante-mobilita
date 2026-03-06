import { Page } from "@playwright/test";
import { LoginFeature } from "./login.feature";

export const getFeatures = (page: Page) => ({
    LoginFeature: new LoginFeature(page),
})   