import { ComponentDTO } from "@api/Components/dto/Component.dto"
import { ProductDTO } from "@api/Product/dto/Product.dto"
import { TechCardDTO } from "@api/TechCards/dto/TechCard.dto"

interface AbstractStockDTO {
    amount: number,
    cost: number,
    childId: number,
}

export interface WarehouseComponentStockDTO extends AbstractStockDTO {
    type: "COMPONENT",
    componentDto: ComponentDTO
}

export interface WarehouseCardStockDTO extends AbstractStockDTO {
    type: "CARD",
    componentDto: TechCardDTO
}

export interface WarehouseProductStockDTO extends AbstractStockDTO {
    type: "PRODUCT",
    componentDto: ProductDTO
}
export type WarehouseStockDTO = WarehouseComponentStockDTO | WarehouseCardStockDTO | WarehouseProductStockDTO;
