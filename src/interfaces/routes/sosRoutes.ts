import { Router } from 'express';
import { SOSController } from '../controllers/SOSController.ts';
import { FirestoreSOSEventRepository } from '../../infrastructure/database/FirestoreSOSEventRepository.ts';
import { TriggerSOSEvent } from '../../domain/use-cases/TriggerSOSEvent.ts';

const sosRoutes = Router();

const repository = new FirestoreSOSEventRepository();
const useCase = new TriggerSOSEvent(repository);
const controller = new SOSController(useCase);

sosRoutes.post('/sos', (req, res) => controller.trigger(req, res));

export default sosRoutes;