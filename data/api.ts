export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const UPEX_DOJO_BASE_URL = 'https://dojo.upexgalaxy.com';

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

export interface CreateTaskRequest {
    title: string;
    description: string;
    priority: "medium";
    status: "backlog";
}
