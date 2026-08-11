import { APIRequestContext } from '@playwright/test';
import { API_BASE_URL, CreatePostRequest} from '@data/api';

export class PostsApi {
    constructor(private request: APIRequestContext) {}

    async createPost(data: CreatePostRequest) {
        return this.request.post(`${API_BASE_URL}/posts`, {
            data,
        });
    }

    async updatePost(id: number, data: CreatePostRequest) {
        return this.request.put(`${API_BASE_URL}/posts/${id}`, {
            data,
        });
    }

    async deletePost(id: number) {
        return this.request.delete(`${API_BASE_URL}/posts/${id}`);
    }
}