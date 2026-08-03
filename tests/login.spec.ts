import { test, expect } from '@playwright/test';

test('User can login with valid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    const username = page.getByPlaceholder('Username');
    await username.fill('standard_user');
    const password = page.getByPlaceholder('Password');
    await password.fill('secret_sauce');
    const loginButton = page.getByRole('button', { name: 'Login' });
    await loginButton.click();
    await expect(page).toHaveURL(/inventory.html/);
});

test('User cannot login with invalid password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    const username = page.getByPlaceholder('Username');
    await username.fill('standard_user');
    const password = page.getByPlaceholder('Password');
    await password.fill('wrong_password');
    const loginButton = page.getByRole('button', { name: 'Login' });
    await loginButton.click();
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();   
    await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
});
