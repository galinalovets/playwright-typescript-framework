import { expect } from '@playwright/test';
import { test } from '@fixtures/pages';

test('GET user by id', async ({ usersApi }) => {

    const response = await usersApi.getUser(1);

    expect(response.status()).toBe(200); //http level
    expect(response.headers()['content-type']).toMatch(/application\/json/);

    const body = await response.json();

    expect(body.id).toBe(1);   //data level
    expect(body.name).toBe('Leanne Graham');
    expect(body.email).toBe('Sincere@april.biz');

});

test('GET user with non-existent ID', async ({ usersApi }) => {

    const response = await usersApi.getUser(9999);

    expect(response.status()).toBe(404);
    expect(response.headers()['content-type']).toMatch(/application\/json/);

    const body = await response.json();

    expect(body).toEqual({});

});