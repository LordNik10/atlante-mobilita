import { Page,test as base, expect } from "@playwright/test";

const URL = "http://localhost:3000/login";

type MyFixtures = {
    authPage: Page;
  };
  

  export const test = base.extend<MyFixtures>({
    authPage: async ({ page }, runWithPage) => {
      await page.goto(URL);
      await page.getByRole('textbox', { name: 'Email' }).click();
      await page.getByRole('textbox', { name: 'Email' }).fill('test@teste2e.com');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill('teste2e');
      await page.getByRole('button', { name: 'Accedi con email' }).click();
      await expect(page.getByRole('button', { name: 'Esplora la Mappa' })).toBeVisible();
      await runWithPage(page);
    },
  
  });