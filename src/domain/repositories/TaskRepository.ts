import type { Task } from '../entities/Task.ts';

export interface TaskRepository {
    create(task: Task): Promise<Task>;

    findByUserId(userId: string): Promise<Task[]>;
    update(taskId: string, data: Partial<Task>): Promise<void>;
    delete(taskId: string): Promise<void>;
}