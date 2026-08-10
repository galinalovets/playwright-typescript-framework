import { APIRequestContext } from '@playwright/test';
import { API_BASE_URL } from '@data/api';

export class UsersApi {
    constructor(private request: APIRequestContext) {}

    async getUser(userId: number) {
        return this.request.get(
            `${API_BASE_URL}/users/${userId}`
        );
    }
}