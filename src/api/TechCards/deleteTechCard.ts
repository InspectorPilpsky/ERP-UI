import { techCardsApi } from "@api/api";
import { TechCard } from "@domain/TechCard";

export async function deleteTechCard(id: TechCard["id"]): Promise<number> {

    const res = await techCardsApi.delete<number, {}>(`/api/v1/cards?id=${id}`);

    return res;
}