import { z } from 'zod';

export const PostSchema = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    body: z.string(),
});

export type Post = z.infer<typeof PostSchema>;

export const CreatePostResponseSchema = z.object({
    id: z.number(),
    title: z.string(),
    body: z.string(),
    userId: z.number(),
});

export const TaskSchema = z.object({
    id: z.string(),
    userId: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.string(),
    priority: z.string(),
    position: z.number(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

export const DeleteTaskResponseSchema = z.object({
    message: z.string(),
});

