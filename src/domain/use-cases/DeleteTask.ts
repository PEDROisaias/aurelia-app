import { TaskRepository } from "../repositories/TaskRepository.ts";

export class DeleteTask {
    constructor(private taskRepository: TaskRepository) {}

    async execute(taskId?: string): Promise<void> {
        if (!taskId) {
            throw new Error("O ID da tarefa é obrigatório.");
        }

        await this.taskRepository.delete(taskId);
    }
}