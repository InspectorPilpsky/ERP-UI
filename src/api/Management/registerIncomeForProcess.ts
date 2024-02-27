import { managementApi } from "@api/api";
import { ManufacturingProcess } from "@domain/Management/ManufacturingProcess";

export async function registerIncomeForProcess(processId: ManufacturingProcess["id"], stock: number): Promise<number> {
    const res = await managementApi.post<number, object>(`/data/receive/factory/${processId}`, {}, {query:{stock}});
    return res;
}