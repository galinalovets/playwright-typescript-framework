import { ApiClient } from './api.client';

export class UsersApi {
    constructor(private apiClient: ApiClient) {}

    async getUser(userId: number) {
        return this.apiClient.get(
            `/users/${userId}`
        );
    }
}