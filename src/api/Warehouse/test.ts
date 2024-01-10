import { warehouseApi } from "../api";
import { PageableWrapper } from "../pageable";

export async function getWarehouse(page: number, size: number): Promise<PageableWrapper<unknown>> {
    const res = await warehouseApi.get<PageableWrapper<unknown>>("/api/v1/warehouse", {query: {page, size}});
    return res;
}