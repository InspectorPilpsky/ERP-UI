import { managementApi } from "@api/api";
import { ManufacturingProcess } from "@domain/Management/ManufacturingProcess";
import { ProcessDTO } from "./dto/Process.dto";
import { processDTOToManufacturingProcess } from "./transformers/fromDto";

type GetProcessesResponse = ProcessDTO[]

function transformResponse(res: GetProcessesResponse): ManufacturingProcess[] {
    return res.map(processDTOToManufacturingProcess);
}

export async function getProcesses(): Promise<ManufacturingProcess[]> {
    const res = await managementApi.get<GetProcessesResponse>("/data/processes");
    return transformResponse(res);
}