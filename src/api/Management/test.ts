import { managementApi } from "../api";
import { PageableWrapper } from "../pageable";

export async function getProcesses(): Promise<PageableWrapper<unknown>> {
    const res = await managementApi.get<PageableWrapper<unknown>>("/data/processes");
    return res;
}