import { ApiClient } from "./api.client";

export interface LoginRequest {
    email: string;
    password: string;
}

export class AuthApi {
    constructor(private apiClient: ApiClient) {}

    async login(data: LoginRequest) {
        return this.apiClient.post('/api/auth/login', data);
    }
}