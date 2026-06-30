import { AureliaInteraction } from "../entities/AureliaInteraction.ts";

export interface AureliaRepository {
    save(interaction: AureliaInteraction): Promise<AureliaInteraction>;
}