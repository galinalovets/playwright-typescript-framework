import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { InventoryPage } from '@pages/InventoryPage';
import { Header } from '@components/Header';



export const test = base.extend<{
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    header: Header;
}>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },

    header: async ({ page }, use) => {
        await use(new Header(page));
    }

});