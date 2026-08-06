import { expect } from '@playwright/test';
import { test } from '@fixtures/pages';
import { users } from '@data/users';
import { products } from '@data/products';
import { customer } from '@data/customer';

test('User can complete checkout with a product', async ({ page, loginPage, inventoryPage, header }) => {
    
    //Login

    await loginPage.goto();
    
    await loginPage.login(
        users.standard.username,
        users.standard.password
    );

    await expect(page).toHaveURL(/inventory.html/);

    //Add product

    await inventoryPage.addProductToCart(products.backpack.name);

    await expect(header.cartBadge).toHaveText('1');

    const productBackpack = page
        .locator('.inventory_item')
        .filter({
            hasText: products.backpack.name
        });
    
    const removeButton = productBackpack.getByTestId(
        'remove-sauce-labs-backpack'
    );
    await expect(removeButton).toBeVisible();
    await expect(removeButton).toHaveText('Remove');
    
    //Open cart

    await page.getByTestId('shopping-cart-link').click();
    //await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart.html/);
    const cartItem = page
        .getByTestId('inventory-item')
        .filter({
            hasText: products.backpack.name
        });
    await expect(cartItem).toHaveCount(1);
    await expect(cartItem).toBeVisible();
    
    //Checkout

    await page.getByTestId('checkout').click();
    await expect(page).toHaveURL(/checkout-step-one.html/);
    await page.getByPlaceholder('First Name').fill(customer.default.firstName);
    await page.getByPlaceholder('Last Name').fill(customer.default.lastName);
    await page.getByPlaceholder('Zip/Postal Code').fill(customer.default.zipCode);
    await page.getByTestId('continue').click();
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(page
        .getByTestId('inventory-item')
        .filter({
            hasText: products.backpack.name
        })
    ).toBeVisible();

    //Finish order

    await page.getByTestId('finish').click();
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
});