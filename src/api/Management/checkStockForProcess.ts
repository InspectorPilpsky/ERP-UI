import { managementApi } from "@api/api";
import { ManufacturingProcess } from "@domain/Management/ManufacturingProcess";

export async function checkStockForProcess(process: ManufacturingProcess): Promise<number> {
    const res = await managementApi.post<number, object>(`/data/receive/order/${process.id}`, {});
    return res;
}