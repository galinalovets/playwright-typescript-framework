import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {

    readonly products: Locator;

    constructor(page: Page) {

        super(page);

        this.products =
            this.page.locator('.inventory_item');

    }

    getProduct(productName: string): Locator {

        return this.products.filter({
            hasText: productName
        
        });
    }

    async addProductToCart(
        productName: string
    ): Promise<void> {

        const product = this.getProduct(productName);

        await product
            .getByRole('button', {
                name: 'Add to cart'
            })
            .click();

    }
}