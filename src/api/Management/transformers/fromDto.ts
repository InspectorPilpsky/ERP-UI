import { ManufacturingProcess } from "@domain/Management/ManufacturingProcess";
import { ProcessDTO } from "@api/Management/dto/Process.dto";

export function processDTOToManufacturingProcess(processDto: ProcessDTO): ManufacturingProcess {
    const {id, cardName, cardCode, stepName, required} = processDto;
    
    return({
        id,
        cardName,
        cardCode,
        stepName,
        required: Number(required)
    })
}