import { test } from '@fixtures/pages';
import { expect } from '@playwright/test';

test('POST create new post', async ({ postsApi }) => {

    const response = await postsApi.createPost({
        title: 'Playwright API test',
        body: 'Created using API automation',
        userId: 1
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.title).toBe('Playwright API test');
    expect(body.body).toBe('Created using API automation');
    expect(body.userId).toBe(1);
});