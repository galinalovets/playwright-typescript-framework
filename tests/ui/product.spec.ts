import { test, expect } from '@playwright/test';

test('User can access inventory page after successful login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory.html/);
    const product = page
    .locator('.inventory_item') //scope locator
    .filter({
        hasText: 'Sauce Labs Backpack'
    });
    await expect(product).toContainText('Sauce Labs Backpack');
    await expect(product.getByTestId('inventory-item-price')).toHaveText('$29.99');
    const addToCartButton = product.getByRole('button', { name: 'Add to cart' });
    await expect(addToCartButton).toBeEnabled();
})