import { expect } from '@playwright/test';
import { test } from '../fixtures/pages';


test('User can add product to cart', async ({ page, loginPage, inventoryPage, header }) => {
     
    await loginPage.open();

    await loginPage.login(
        'standard_user',
        'secret_sauce'
    );

    await expect(page).toHaveURL(/inventory.html/);

    await inventoryPage.addProductToCart(
        'Sauce Labs Backpack'
    );

    await expect(header.cartBadge)
        .toHaveText('1');
})