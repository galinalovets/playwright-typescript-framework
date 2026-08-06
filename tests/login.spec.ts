import { expect } from '@playwright/test';
import { test } from '../fixtures/pages';
import { LoginPage } from '../pages/LoginPage';

test('User can login with valid credentials', async ({ loginPage, page }) => {
    
    await loginPage.open();

    await loginPage.login(
        'standard_user',
        'secret_sauce'
    );

    await expect(page)
        .toHaveURL(/inventory.html/);
});

test('User cannot login with invalid password', async ({ loginPage, page }) => {
    
    await loginPage.open();

    await loginPage.login(
        'standard_user',
        'wrong_password'
    );
    
    await expect(loginPage.errorMessage)
        .toBeVisible();   
    await expect(loginPage.errorMessage)
        .toHaveText('Epic sadface: Username and password do not match any user in this service');
});
