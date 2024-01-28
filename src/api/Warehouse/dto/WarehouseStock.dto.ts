import { ComponentDTO } from "@api/Components/dto/Component.dto"

export type WarehouseStockDTO = {
    amount: number,
    cost: number,
    type: string,
    childId: number,
    componentDto: ComponentDTO
}