import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { InventoryPage } from '@pages/InventoryPage';
import { Header } from '@components/Header';
import { CartPage } from '@pages/CartPage';
import { CheckoutPage } from '@pages/CheckoutPage';
import { UsersApi } from 'tests/api/users.api';
import { PostsApi } from 'tests/api/posts.api';


export const test = base.extend<{
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    header: Header;
    usersApi: UsersApi;
    postsApi: PostsApi;
}>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    header: async ({ page }, use) => {
        await use(new Header(page));
    },

    usersApi: async ({ request }, use) => {
        await use(new UsersApi(request));
    },

    postsApi: async ({ request }, use) => {
        await use(new PostsApi(request));
    },

});