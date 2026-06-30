import { SOSEvent } from "../entities/SOSEvent.ts";

export interface SOSEventRepository {
    save(event: SOSEvent): Promise<SOSEvent>;
    getCaregiverTokensByPatient(patientId: string): Promise<{ tokens: string[], patientName: string }>;
}