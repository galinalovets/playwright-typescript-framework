import { test, expect } from '@playwright/test';

test('User can navigate to documentation from homepage', async ({ page }) => {

    await page.goto('https://playwright.dev');

    const getStarted = page.getByRole('link', { name: 'Get started' });

    await expect(getStarted).toBeVisible();

    await getStarted.click();

    await expect(page).toHaveURL(/docs/);

});