import { Locator, Page } from '@playwright/test';

export class Header {

    readonly cartLink: Locator;
    readonly cartBadge: Locator;

    constructor(private page: Page) {

        this.cartLink = 
            this.page.getByTestId('shopping-cart-link')

        this.cartBadge =  
            this.page.locator('.shopping_cart_badge');

}

async openCart(): Promise<void> {
    await this.cartLink.click();
}

}