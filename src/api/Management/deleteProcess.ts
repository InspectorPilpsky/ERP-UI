import { managementApi } from "@api/api";
import { ManufacturingProcess } from "@domain/Management/ManufacturingProcess";

type DeleteProcessResponse = string

export async function deleteProcess(id: ManufacturingProcess["id"]): Promise<string> {
    const res = await managementApi.delete<DeleteProcessResponse, object>(`/data/processes/${id}`);
    return res;
}