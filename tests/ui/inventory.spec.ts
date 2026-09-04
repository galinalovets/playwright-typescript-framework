import { expect } from '@playwright/test';
import { test } from '@fixtures/pages';
import { users } from '@data/users';
import { products } from '@data/products';


test('User can add product to cart', async ({ page, loginPage, inventoryPage, header }) => {
     
    await loginPage.open();

    await loginPage.login(
        users.standard.username,
        users.standard.password
    );

    await expect(page).toHaveURL(/inventory.html/);

    await inventoryPage.addProductToCart(products.backpack.name);

    await expect(header.cartBadge)
        .toHaveText('1');
})