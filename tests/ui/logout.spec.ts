import { test, expect } from '@playwright/test';

test('User can logout successfully', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const username = page.getByPlaceholder('Username');
    await username.fill('standard_user');
    const password = page.getByPlaceholder('Password');
    await password.fill('secret_sauce');
    const loginButton = page.getByRole('button', { name: 'Login' });
    await loginButton.click();
    await expect(page).toHaveURL(/inventory.html/);
    const openMenu = page.getByRole('button', { name: 'Open Menu'});
    await openMenu.click();
    const logout = page.getByTestId('logout-sidebar-link');
    await logout.click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(username).toBeVisible();
})