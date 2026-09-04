import { test } from '@fixtures/pages';
import { expect } from '@playwright/test';

test('should login to UPEX DOJO', async ({ authApi }) => {
    const response = await authApi.login({
        email: 'testuser@upex.dev',
        password: 'Test123!',
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.access_token).toBeTruthy();
});