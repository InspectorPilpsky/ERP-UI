import { techCardsApi } from "@api/api";
import { TechCard } from "@domain/TechCard";
import { techCardToTechCardDTO } from "./transforers/toDto";
import { TechCardDTO } from "./dto/TechCard.dto";

export async function saveTechCard(techCard: TechCard): Promise<number> {
    
    const techCardDto = techCardToTechCardDTO(techCard);

    const res = await techCardsApi.post<number, TechCardDTO>("/api/v1/cards", techCardDto);

    return res;
}