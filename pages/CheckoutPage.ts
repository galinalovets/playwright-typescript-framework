import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class CheckoutPage extends BasePage {


    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly completeHeader: Locator;

    constructor(page: Page) {

        super(page);


        this.firstNameInput =
            this.page.getByPlaceholder('First Name');

        this.lastNameInput =
            this.page.getByPlaceholder('Last Name');

        this.zipCodeInput =
            this.page.getByPlaceholder('Zip/Postal Code');

        this.continueButton =
            this.page.getByTestId('continue');

        this.finishButton =
            this.page.getByTestId('finish');

        this.completeHeader =
            this.page.getByTestId('complete-header');

    }



    async fillCheckoutInformation(
        firstName: string,
        lastName: string,
        zipCode: string
    ): Promise<void> {

        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);

    }

    async continueCheckout(): Promise<void> {

        await this.continueButton.click();

    }

    getOrderItem(productName: string): Locator {

        return this.page
            .getByTestId('inventory-item')
            .filter({
                hasText: productName
            });

    }

    async finishCheckout(): Promise<void> {

        await this.finishButton.click();

    }

}