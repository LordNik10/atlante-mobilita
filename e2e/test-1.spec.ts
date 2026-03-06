import { test } from '@/fixtures';
import { expect } from '@playwright/test';

test('test', async ({ authPage }) => {
  await authPage.getByRole('button', { name: 'Mappa', exact: true }).click();
  await expect(authPage.getByRole('button', { name: 'Filtri' })).toBeVisible();
});
