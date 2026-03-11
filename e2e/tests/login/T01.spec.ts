import { test } from '@/fixtures';
import { expect } from '@playwright/test';

test('Login', async ({ authPage }) => {
  await expect(authPage.getByRole('button', { name: 'Mappa', exact: true })).toBeVisible({ timeout: 10000 });
});
