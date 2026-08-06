import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    


    constructor(page: Page) {

        super(page);

        this.usernameInput =
            this.page.getByPlaceholder('Username');

        this.passwordInput =
            this.page.getByPlaceholder('Password');

        this.loginButton =
            this.page.getByRole('button', {
                name: 'Login'
            });

        this.errorMessage = 
            this.page.getByTestId('error');

    }

    async open(): Promise<void> {

        await this.goto(
            'https://www.saucedemo.com'
        );

    }

    async login(
        username: string,
        password: string
    ): Promise<void> {
        await this.usernameInput.fill(username);

        await this.passwordInput.fill(password);

        await this.loginButton.click();
    }
}