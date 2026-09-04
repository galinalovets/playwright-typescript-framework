import { CreateTaskRequest } from "@data/api";
import { ApiClient } from "./api.client";

export class TasksApi {
    constructor(private apiClient: ApiClient) {}

    async createTask(data: CreateTaskRequest) {
        return this.apiClient.post('/api/tasks', data);
    }
}