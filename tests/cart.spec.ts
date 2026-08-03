import { test, expect } from '@playwright/test';

test('User can add a product to the cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    const username = page.getByPlaceholder('Username');
    await username.fill('standard_user');
    const password = page.getByPlaceholder('Password');
    await password.fill('secret_sauce');
    const loginButton = page.getByRole('button', { name: 'Login' });
    await loginButton.click();
    await expect(page).toHaveURL(/inventory.html/);
    const addToCartButton = page.getByTestId('add-to-cart-sauce-labs-backpack');
    await addToCartButton.click();
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
});