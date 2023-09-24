import api from "../api";
import { PageableWrapper } from "../pageable";
import { Component } from "./domain/Component";
import { ComponentDTO } from "./dto/Component.dto";
import { componentDTOToComponent } from "./transformers/fromDto";

type GetComponentsResponse = PageableWrapper<ComponentDTO[]>;

function transformResponse(res: GetComponentsResponse): PageableWrapper<Component[]> {
    return {
        ...res,
        content: res.content.map(componentDTOToComponent)
    }
}

export async function getComponents(): Promise<PageableWrapper<Component[]>> {
    const res = await api.get<GetComponentsResponse>("/api/v1/directory/component");
    return transformResponse(res);
}