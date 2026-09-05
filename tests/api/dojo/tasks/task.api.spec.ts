import { test } from '@fixtures/pages';
import { expect } from '@playwright/test';
import { DeleteTaskResponseSchema, TaskSchema } from '@data/api.schemas';

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

test('should get task by id', async ({ tasksApi }) => {
    const createResponse = await tasksApi.createTask({
        title: 'Regression task to get',
        description: 'Created by API',
        priority: 'medium',
        status: 'backlog',
    });

    const { id } = await createResponse.json();

    const response = await tasksApi.getTask(id);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody = await response.json();

    const taskById = TaskSchema.parse(responseBody);

    expect(taskById.title).toBe('Regression task to get');
    expect(taskById.description).toBe('Created by API');
    expect(taskById.status).toBe('backlog');
    expect(taskById.priority).toBe('medium');
});

test('should delete task', async ({ tasksApi }) => {
    const createResponse = await tasksApi.createTask({
        title: 'Regression task to delete',
        description: 'Created by API',
        priority: 'medium',
        status: 'backlog',
    });

    const { id } = await createResponse.json();

    const response = await tasksApi.deleteTask(id);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody = await response.json();

    const deletedResponseBody = DeleteTaskResponseSchema.parse(responseBody);

    const deletedResponse = await tasksApi.getTask(id);

    expect(deletedResponse.status()).toBe(404);

});

test('should edit task title', async ({ tasksApi }) => {
    const createResponse = await tasksApi.createTask({
        title: 'Regression task to delete',
        description: 'Created by API',
        priority: 'medium',
        status: 'backlog',
    });

    const { id } = await createResponse.json();

    const response = await tasksApi.updateTask(id,
        {
            title: 'Updated Regression task',
            description: 'Created by API',
            priority: 'medium',
            status: 'backlog',
            position: 0,
        }
    );

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const responseBody = await response.json();

    const updatedResponseBody = TaskSchema.parse(responseBody);

    const updatedResponse = await tasksApi.getTask(id);

    const { title } = await updatedResponse.json();

    expect(title).toBe('Updated Regression task');

});