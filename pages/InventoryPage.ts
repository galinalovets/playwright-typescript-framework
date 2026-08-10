import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class InventoryPage extends BasePage {

    readonly products: Locator;

    constructor(page: Page) {

        super(page);

        this.products =
            this.page.getByTestId('inventory-item');

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

    async removeProductFromCart(productName: string): Promise<void> {

        const product = this.getProduct(productName);

        const removeButton = product.getByRole('button', {
            name: 'Remove'
        });

        await removeButton.click();

    }

    getProductButton(productName: string): Locator {
        return this.getProduct(productName)
            .getByRole('button');
    }

}