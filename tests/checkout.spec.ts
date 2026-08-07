import { expect } from '@playwright/test';
import { test } from '@fixtures/pages';
import { products } from '@data/products';
import { customer } from '@data/customer';

test('User can complete checkout with a product', async ({
    page,
    inventoryPage,
    cartPage,
    checkoutPage,
    header }) => {

    await page.goto('/inventory.html');

    await expect(page).toHaveURL(/inventory.html/);

    await inventoryPage.addProductToCart(products.backpack.name);

    await expect(header.cartBadge).toHaveText('1');

    await expect(
        inventoryPage.getProductButton(products.backpack.name)
    ).toHaveText('Remove');

    await header.openCart();

    await expect(page).toHaveURL(/cart.html/);

    const cartItem = cartPage.getCartItem(products.backpack.name);

    await expect(cartItem).toHaveCount(1);
    await expect(cartItem).toBeVisible();

    await cartPage.clickCheckout();

    await expect(page).toHaveURL(/checkout-step-one.html/);

    await checkoutPage.fillCheckoutInformation(
        customer.default.firstName,
        customer.default.lastName,
        customer.default.zipCode
    );

    await checkoutPage.continueCheckout();

    await expect(page).toHaveURL(/checkout-step-two.html/);

    const orderItem = checkoutPage.getOrderItem(
        products.backpack.name
    );

    await expect(orderItem).toBeVisible();
    await expect(orderItem).toHaveCount(1);

    //Finish order

    await checkoutPage.finishCheckout();

    await expect(page).toHaveURL(/checkout-complete.html/);

    await expect(checkoutPage.completeHeader)
        .toHaveText('Thank you for your order!');
});