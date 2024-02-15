import { managementApi } from "@api/api";
import { ComponentDTO } from "@api/Components/dto/Component.dto";
import { Component } from "@domain/Component";
import { componentDTOToComponent } from "@api/Components/transformers/fromDto";
import { ManufacturingProcess } from "@domain/Management/ManufacturingProcess";

type GetProcessInfoResponse = ComponentDTO[]

function transformResponse(res: GetProcessInfoResponse): Component[] {
    return res.map(componentDTOToComponent);
}

export async function getProcessInfo(id: ManufacturingProcess["id"]): Promise<Component[]> {
    const res = await managementApi.get<GetProcessInfoResponse>(`/data/processes/${id}`);
    return transformResponse(res);
}