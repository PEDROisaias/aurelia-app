import { Request, Response } from 'express';
import { CreateTaskUseCase } from '../../domain/use-cases/CreateTask.ts';
import { TaskRepository } from '../../domain/repositories/TaskRepository.ts';
import { GetTask } from '../../domain/use-cases/GetTasks.ts';
import { DeleteTask } from '../../domain/use-cases/DeleteTask.ts';
import { UpdateTask } from '../../domain/use-cases/UpdateTask.ts';

export class TaskController {
    constructor(private createTaskUseCase: CreateTaskUseCase, private taskRepository: TaskRepository) {}

    async createTask(req: Request, res: Response) {
        try {
            const { patientId, title, description, scheduledTo } = req.body;

            const task = await this.createTaskUseCase.execute({
                patientId,
                title,
                description,
                scheduledTo: new Date(scheduledTo)
            });

            return res.status(201).json(task);
        } 
        catch (error: any) {
            return res.status(400).json({ error: error.message });
        } 
    }

    async getTasks(req: Request, res: Response) {
        try {
            const userId = req.params.userId as string;
            const getTaskUseCase = new GetTask(this.taskRepository);
            const tasks = await getTaskUseCase.execute(userId);
            
            res.status(200).json(tasks);
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao buscar tarefas'});
        }
    }

    async updateTask (req: Request, res: Response) {
        try {
            const taskId = req.params.taskId as string;
            const data = req.body;

            const updateTaskUseCase = new UpdateTask(this.taskRepository);
            await updateTaskUseCase.execute(taskId, data);

            res.status(200).json({ message: 'Tarefa atualizada com sucesso! '});
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar tarefa' });
        }
    }

    async deleteTask (req: Request, res: Response) {
        try {
            const taskId = req.params.taskId as string;

            const deleteTaskUseCase = new DeleteTask(this.taskRepository);
            await deleteTaskUseCase.execute(taskId);

            res.status(200).json({ message: 'Tarefa deletada com sucesso! '});
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao deletar tarefa' });
        }
    }
}