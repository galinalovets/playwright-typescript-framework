import { test, expect } from '@playwright/test';

test('User can complete checkout with a product', async ({ page }) => {
    //Login
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory.html/);
    //Add product
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
    //Open cart
    await page.getByTestId('shopping-cart-link').click();
    //await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart.html/);
    const cartItem = page
        .getByTestId('inventory-item')
        .filter({
            hasText: 'Sauce Labs Backpack'
        });
    await expect(cartItem).toHaveCount(1);
    await expect(cartItem).toBeVisible();
    //Checkout
    await page.getByTestId('checkout').click();
    await expect(page).toHaveURL(/checkout-step-one.html/);
    await page.getByPlaceholder('First Name').fill('John');
    await page.getByPlaceholder('Last Name').fill('Smith');
    await page.getByPlaceholder('Zip/Postal Code').fill('12345');
    await page.getByTestId('continue').click();
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(page
        .getByTestId('inventory-item')
        .filter({
            hasText: 'Sauce Labs Backpack'
        })
    ).toBeVisible();
    //Finish order
    await page.getByTestId('finish').click();
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
});