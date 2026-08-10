export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface CreatePostRequest {
    title: string;
    body: string;
    userId: number;
}

export interface CreatePostResponse {
    id: number;
    title: string;
    body: string;
    userId: number;
}