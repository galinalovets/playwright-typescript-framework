import { test } from '@fixtures/pages';
import { expect } from '@playwright/test';

test('POST create new post', async ({ postsApi }) => {

    const response = await postsApi.createPost({
        title: 'Playwright API test',
        body: 'Created using API automation',
        userId: 1
    });

    expect(response.status()).toBe(201);
    expect(response.headers()['content-type']).toMatch(/application\/json/);

    const body = await response.json();

    expect(body).toMatchObject({
        title: 'Playwright API test',
        body: 'Created using API automation',
        userId: 1
    });
    expect(body.id).toEqual(expect.any(Number));

});

test('PUT update post', async ({ postsApi }) => {

    const response = await postsApi.updatePost(
        1,
        {
            title: 'Updated Playwright API test',
            body: 'Updated using API automation',
            userId: 1
        },
    );

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toMatch(/application\/json/);

    const body = await response.json();

    expect(body).toMatchObject({
        id: 1,
        title: 'Updated Playwright API test',
        body: 'Updated using API automation',
        userId: 1
    });

});

test('DELETE post', async ({ postsApi }) => {

    const response = await postsApi.deletePost(1);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toEqual({});

});