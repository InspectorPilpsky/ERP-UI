import { TechCard } from "@domain/TechCard";

export interface ManufacturingProcess {
    id: string,
    cardName: TechCard["name"],
    cardCode: TechCard["code"],
    stepName: string,
    required: number
}