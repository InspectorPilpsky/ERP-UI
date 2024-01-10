import { CategoryDTO } from "../Categories/dto/Category.dto";
import { techCardsApi } from "../api";
import { PageableWrapper } from "../pageable";
import { Component } from "./domain/Component";
import { ComponentDTO } from "./dto/Component.dto";
import { componentDTOToComponent } from "./transformers/fromDto";

type GetComponentsResponse = PageableWrapper<ComponentDTO[]>;

export type ComponentFilter = {
    code: ComponentDTO["code"] | null,
    categoryId: CategoryDTO["id"]
}

function transformResponse(res: GetComponentsResponse): PageableWrapper<Component[]> {
    return {
        ...res,
        content: res.content.map(componentDTOToComponent)
    }
}

export async function getComponents(page: number, size: number, filter: ComponentFilter): Promise<PageableWrapper<Component[]>> {
    const {code, categoryId} = filter;
    const res = await techCardsApi.get<GetComponentsResponse>("/api/v1/directory/component", 
    {query: {
        page, 
        size, 
        code, 
        categoryId: categoryId && categoryId > 0 ? categoryId : null
    }});
    return transformResponse(res);
}