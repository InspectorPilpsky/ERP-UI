import { Component } from "@domain/Component";
import { ComponentDTO } from "./dto/Component.dto";
import { componentTocomponentDTO } from "./transformers/toDto";
import { techCardsApi } from "@api/api";

export async function addComponent(component: Component): Promise<number> {
    
    const componentDto = componentTocomponentDTO(component);

    const res = await techCardsApi.post<number, ComponentDTO>("/api/v1/directory/component", componentDto)

    return res;
}