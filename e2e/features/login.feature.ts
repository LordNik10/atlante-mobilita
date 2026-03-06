import { expect, Page } from "@playwright/test";

export class LoginFeature {
    constructor(private readonly page: Page) {}
    async login(email: string, password: string) {
        await this.page.getByRole('textbox', { name: 'Email' }).click();
        await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
        await this.page.getByRole('textbox', { name: 'Password' }).click();
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Accedi con email' }).click();
        await expect(this.page.getByRole('button', { name: 'Esplora la Mappa' })).toBeVisible({ timeout: 10000 });
    }
}