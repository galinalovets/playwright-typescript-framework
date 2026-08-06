import { test, expect } from '@playwright/test';

test('User can add a product to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory.html/);
    
    const productTShirt = page
    .locator('.inventory_item')
    .filter({
        hasText: 'Sauce Labs Bolt T-Shirt'
    });
    await expect(productTShirt.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Bolt T-Shirt');
    await expect(productTShirt.getByTestId('inventory-item-price')).toHaveText('$15.99');
    await expect(productTShirt.getByRole('button', { name: 'Add to cart' })).toBeEnabled();
    
    const productBackpack = page
    .locator('.inventory_item')
    .filter({
        hasText: 'Sauce Labs Backpack'
    });
    const addToCartButton = productBackpack.getByTestId('add-to-cart-sauce-labs-backpack');
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();
    const removeButton = productBackpack.getByTestId(
        'remove-sauce-labs-backpack'
    );
    await expect(removeButton).toBeVisible();
    await expect(removeButton).toHaveText('Remove');
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
});