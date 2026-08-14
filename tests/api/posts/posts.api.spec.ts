import { test } from '@fixtures/pages';
import { expect } from '@playwright/test';

test('GET post by id', async ({ postsApi }) => {

    const response = await postsApi.getPost(1);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toMatch(/application\/json/);

    const body = await response.json();

    expect(body.id).toBe(1);
    expect(body.userId).toBe(1);
    expect(body.title).toEqual(expect.any(String));
    expect(body.body).toEqual(expect.any(String));

});

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

test('POST create post with missing title', async ({ postsApi }) => {
    const response = await postsApi.createPostWithInvalidData({
        body: 'Created using API automation',
        userId: 1
    });

    const body = await response.json();

    expect(response.headers()['content-type']).toMatch(/application\/json/);
    expect(response.status()).toBe(201);

    expect(body).toMatchObject({
        body: 'Created using API automation',
        userId: 1
    });

    expect(body.id).toEqual(expect.any(Number));

});

test('POST create post with invalid data type', async ({ postsApi }) => {
    const response = await postsApi.createPostWithInvalidData({
        title: 123,
        body: true,
        userId: "hello"
    });

    const body = await response.json();

    expect(response.headers()['content-type']).toMatch(/application\/json/);
    expect(response.status()).toBe(201);

    expect(body).toMatchObject({
        title: 123,
        body: true,
        userId: "hello"
    });

    expect(body.id).toEqual(expect.any(Number));

});