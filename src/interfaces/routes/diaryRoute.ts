import { Router } from 'express';
import { DiaryController } from '../controllers/DiaryController.ts';
import { FirestoreDiaryRepository } from '../../infrastructure/database/FirestoreDiaryRepository.ts';
import { CreateDiaryEntry } from '../../domain/use-cases/CreateDiaryEntry.ts';

const diaryRoutes = Router();

const repository = new FirestoreDiaryRepository();
const useCase = new CreateDiaryEntry(repository);
const controller = new DiaryController(useCase);

diaryRoutes.post('/diaries', (req, res) => controller.create(req, res));

export default diaryRoutes;