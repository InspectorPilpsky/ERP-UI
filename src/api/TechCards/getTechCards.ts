import { techCardsApi } from "@api/api";
import { PageableWrapper } from "../pageable";
import { TechCardDTO } from "./dto/TechCard.dto";
import { techCardDTOToTechCard } from "./transforers/fromDto";
import { TechCard } from "@domain/TechCard";

type GetTechCardsResponse = PageableWrapper<TechCardDTO[]>;

function transformResponse(res: GetTechCardsResponse): PageableWrapper<TechCard[]> {
    return {
        ...res,
        content: res.content.map(techCardDTOToTechCard)
    }
}

export async function getTechCards(page: number, size: number): Promise<PageableWrapper<TechCard[]>> {
    const res = await techCardsApi.get<GetTechCardsResponse>("/api/v1/cards", {query: {page, size}});
    return transformResponse(res);
}