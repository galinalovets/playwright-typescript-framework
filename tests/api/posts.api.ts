import { APIRequestContext } from '@playwright/test';
import { API_BASE_URL, CreatePostRequest, CreatePostResponse } from '@data/api';

export class PostsApi {
    constructor(private request: APIRequestContext) {}

    async createPost(data: CreatePostRequest) {
        return this.request.post(`${API_BASE_URL}/posts`, {
            data,
        });
    }
}