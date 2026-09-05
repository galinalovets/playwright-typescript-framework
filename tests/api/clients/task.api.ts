import { CreateTaskRequest, UpdateTaskRequest } from "@data/api";
import { ApiClient } from "./api.client";

export class TasksApi {
    constructor(private apiClient: ApiClient) {}

    async createTask(data: CreateTaskRequest) {
        return this.apiClient.post('/api/tasks', data);
    }

    async getTask(id: string) {
        return this.apiClient.get(`/api/tasks/${id}`);
    }

    async deleteTask(id: string) {
        return this.apiClient.delete(`/api/tasks/${id}`);
    }

    async updateTask(id: string, data: UpdateTaskRequest) {
        return this.apiClient.put(`/api/tasks/${id}`, data);
    }
}