import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { InventoryPage } from '@pages/InventoryPage';
import { Header } from '@components/Header';
import { CartPage } from '@pages/CartPage';
import { CheckoutPage } from '@pages/CheckoutPage';
import { UsersApi } from 'tests/api/clients/users.api';
import { PostsApi } from 'tests/api/clients/posts.api';
import { APIRequestContext } from '@playwright/test';
import { ApiClient } from 'tests/api/clients/api.client';
import { API_BASE_URL } from '@data/api';


export const test = base.extend<{
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    header: Header;
    apiRequest: APIRequestContext;
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

    apiRequest: async ({ playwright }, use) => {
        const apiRequest = await playwright.request.newContext({
            baseURL: API_BASE_URL,
        });

        await use(apiRequest);

        await apiRequest.dispose();
    },
    
    usersApi: async ({ apiRequest }, use) => {
        const apiClient = new ApiClient(apiRequest);
        await use(new UsersApi(apiClient));
    },

    postsApi: async ({ apiRequest }, use) => {
        const apiClient = new ApiClient(apiRequest);
        await use(new PostsApi(apiClient));
    },

});