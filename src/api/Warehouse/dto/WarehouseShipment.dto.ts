import { ComponentDTO } from "@api/Components/dto/Component.dto"

export type WarehouseShipmentDTO = {
    action:	boolean,
    amount:	number,
    cost: number,
    type: "CARD" | "COMPONENT",
    childId: number,
    orderNumber: string,
    inDateTime: string,
    componentDto: ComponentDTO
}