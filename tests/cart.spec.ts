import { expect } from '@playwright/test';
import { test } from '@fixtures/pages';
import { products } from '@data/products';

test.describe('Cart', () => {

    test('User can add product to cart', async ({ page, inventoryPage, header }) => {

        await test.step('Open inventory', async () => {
            await page.goto('/inventory.html');

            await expect(page).toHaveURL(/inventory.html/);
        });

        await test.step('Verify product', async () => {
            const product = inventoryPage.getProduct(products.backpack.name);

            await expect(product).toContainText(products.backpack.name);

            await expect(
                product.getByTestId('inventory-item-price')
            ).toHaveText(products.backpack.price);
        });

        await test.step('Add product to cart and verify cart', async () => {
            const addToCartButton =
                inventoryPage.getProductButton(products.backpack.name);

            await expect(addToCartButton).toBeEnabled();

            await inventoryPage.addProductToCart(products.backpack.name);

            const removeButton = inventoryPage.getProductButton(products.backpack.name);

            await expect(removeButton).toBeVisible();

            await expect(removeButton).toHaveText('Remove');

            const cartBadge = header.cartBadge;

            await expect(cartBadge).toHaveText('1');
        });
    });
});