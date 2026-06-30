import { Router } from "express";
import { ContactController } from "../controllers/ContactController.ts";
import { CommunicationController } from "../controllers/CommunicationController.ts";
import { CreateContact } from "../../domain/use-cases/CreateContact.ts";
import { LogCommunication } from "../../domain/use-cases/CommunicationLog.ts";

const communicationRoutes = Router();

const createContact = new CreateContact();
const contactController = new ContactController(createContact);

const logCommunication =  new LogCommunication();
const communicatonController = new CommunicationController(logCommunication);

communicationRoutes.post('/patients/:patientId/contacts', (req, res) => contactController.create(req, res));

communicationRoutes.post('/communication/log', (req, res) => communicatonController.log(req, res));

export default communicationRoutes;