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
import { API_BASE_URL, UPEX_DOJO_BASE_URL } from '@data/api';
import { TasksApi } from 'tests/api/clients/task.api';
import { AuthApi } from 'tests/api/clients/auth.api';


export const test = base.extend<{
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    header: Header;

    apiRequest: APIRequestContext;
    dojoApiRequest: APIRequestContext;
    authenticatedDojoApiRequest: APIRequestContext;

    usersApi: UsersApi;
    postsApi: PostsApi;
    tasksApi: TasksApi;
    authApi: AuthApi;

    taskCleanup: {
        add: (taskId: string) => void;
        remove: (taskId: string) => void;
    };
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

    dojoApiRequest: async ({ playwright }, use) => {
        const apiRequest = await playwright.request.newContext({
            baseURL: UPEX_DOJO_BASE_URL,
        });

        await use(apiRequest);

        await apiRequest.dispose();
    },

    authenticatedDojoApiRequest: async ({ playwright }, use) => {
        // login
        const loginRequest = await playwright.request.newContext({
            baseURL: UPEX_DOJO_BASE_URL,
        });

        const loginResponse = await loginRequest.post('/api/auth/login', {
            data: {
                email: 'testuser@upex.dev',
                password: 'Test123!',
            },
        });

        const { access_token } = await loginResponse.json();

        await loginRequest.dispose();

        // authenticated context
        const apiRequest = await playwright.request.newContext({
            baseURL: UPEX_DOJO_BASE_URL,
            extraHTTPHeaders: {
                Authorization: `Bearer ${access_token}`,
            },
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

    tasksApi: async ({ authenticatedDojoApiRequest }, use) => {
        const apiClient = new ApiClient(authenticatedDojoApiRequest);
        await use(new TasksApi(apiClient));
    },

    taskCleanup: async ({ tasksApi }, use) => {
        const taskIds = new Set<string>();
    
        const cleanup = {
            add: (taskId: string) => {
                taskIds.add(taskId);
            },
    
            remove: (taskId: string) => {
                taskIds.delete(taskId);
            },
        };
    
        await use(cleanup);
    
        for (const taskId of taskIds) {
            try {
                const response = await tasksApi.deleteTask(taskId);
    
                if (!response.ok()) {
                    console.warn(
                        `Cleanup failed for task ${taskId}: ${response.status()}`
                    );
                }
            } catch (error) {
                console.warn(`Cleanup failed for task ${taskId}:`, error);
            }
        }
    },

    authApi: async ({ dojoApiRequest }, use) => {
        const apiClient = new ApiClient(dojoApiRequest);
        await use(new AuthApi(apiClient));
    },

});
