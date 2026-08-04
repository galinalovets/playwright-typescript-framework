import { test, expect } from '@playwright/test';

test('User can access inventory page after successful login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory.html/);
    await expect(
        page.getByRole('heading', { name: 'Products' })
    ).toBeVisible();
    await expect(page.locator('.inventory_item')).toHaveCount(6);
})