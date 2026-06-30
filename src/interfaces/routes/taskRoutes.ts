import { Router } from 'express';
import { TaskController } from '../controllers/TaskController.ts';
import { AuthMiddleware } from '../middlewares/AuthMiddleware.ts';

const router = Router();
const taskController = new TaskController();

router.use(AuthMiddleware.isAuthenticated);
router.post('/tasks', AuthMiddleware.isRole(['caregiver']), taskController.createTask);
router.get('/tasks/user/:userId', AuthMiddleware.isRole(['patient', 'caregiver']), taskController.getTasks);
router.patch('/tasks/:taskId', AuthMiddleware.isRole(['patient', 'caregiver']), taskController.updateTask);
router.delete('/tasks/:taskId', AuthMiddleware.isRole(['caregiver']), taskController.deleteTask);

export default router;