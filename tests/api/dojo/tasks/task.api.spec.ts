import { test } from '@fixtures/pages';
import { expect } from '@playwright/test';
import { TaskSchema } from '@data/api.schemas';

test('should create task', async ({ tasksApi }) => {
    const response = await tasksApi.createTask({
        title: 'Regression task',
        description: 'Created by API',
        priority: 'medium',
        status: 'backlog',
    });

    expect(response.status()).toBe(201);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();

    const task = TaskSchema.parse(body);

    expect(task.title).toBe('Regression task');
    expect(task.description).toBe('Created by API');
    expect(task.status).toBe('backlog');
    expect(task.priority).toBe('medium');
});