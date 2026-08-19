import { ApiClient } from './api.client';
import { CreatePostRequest } from '@data/api';

export class PostsApi {
    constructor(private apiClient: ApiClient) {}

    async getPosts() {
        return await this.apiClient.get('/posts');
    }

    async getPost(id: number) {
        return await this.apiClient.get(`/posts/${id}`);
    }

    async createPost(data: CreatePostRequest) {
        return this.apiClient.post('/posts', data);
    }

    async createPostWithInvalidData(data: unknown) {
        return this.apiClient.post('/posts', data);
    }

    async updatePost(id: number, data: CreatePostRequest) {
        return this.apiClient.put(`/posts/${id}`, data);
    }

    async deletePost(id: number) {
        return this.apiClient.delete(`/posts/${id}`);
    }
}