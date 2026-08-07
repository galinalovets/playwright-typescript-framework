import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class CartPage extends BasePage {

    readonly checkoutButton: Locator;

    constructor(page: Page) {

        super(page);

        this.checkoutButton =
            this.page.getByTestId('checkout');

    }

    getCartItem(productName: string): Locator {
        return this.page
            .getByTestId('inventory-item')
            .filter({
                hasText: productName
            });
    }

    async clickCheckout(): Promise<void> {

        await this.checkoutButton.click();

    }

}