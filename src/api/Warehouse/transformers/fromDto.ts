import { componentDTOToComponent } from "@api/Components/transformers/fromDto";
import { WarehouseStockDTO } from "../dto/WarehouseStock.dto";
import { WarehouseStock, WarehouseStockType } from "@domain/Warehouse/WarehouseStock";
import { WarehouseShipment, WarehouseShipmentAction, WarehouseShipmentType } from "@domain/Warehouse/WarehouseShipment";
import { WarehouseShipmentDTO } from "../dto/WarehouseShipment.dto";
import { techCardDTOToTechCard } from "@api/TechCards/transforers/fromDto";
import { productDTOToProduct } from "@api/Product/transformers/fromDto";

export function fromWarehouseStockDTOToWarehouseStock(warehouseStockDto: WarehouseStockDTO): WarehouseStock {
    const {amount, cost, childId, type} = warehouseStockDto;

    switch (type) {
        case "CARD": {
            const {componentDto} = warehouseStockDto;
            const techCard = techCardDTOToTechCard(componentDto);
            return ({
                amount,
                cost,
                childId,
                type: WarehouseStockType.CARD,
                techCard
            })
        }
        case "COMPONENT": {
            const {componentDto} = warehouseStockDto;
            const component = componentDTOToComponent(componentDto);
            return ({
                amount,
                cost,
                childId,
                type: WarehouseStockType.COMPONENT,
                component
            })
        }
        case "PRODUCT": {
            const {componentDto} = warehouseStockDto;
            const product = productDTOToProduct(componentDto);
            return ({
                amount,
                cost,
                childId,
                type: WarehouseStockType.PRODUCT,
                product
            })
        }
        default:
            throw new Error("Неизвестный тип WarehouseStockDTO")
    }
}

export function fromWarehouseShipmentDTOToWarehouseShipment(warehouseShipmentDto: WarehouseShipmentDTO): WarehouseShipment {
    const {action, amount, cost, childId, componentDto, inDateTime, orderNumber, type} = warehouseShipmentDto;
    const component = componentDTOToComponent(componentDto);
    const warehouseShipment= {
        action: action ? WarehouseShipmentAction.INCOME : WarehouseShipmentAction.OUTCOME,
        amount,
        component,
        cost,
        childId,
        type: WarehouseShipmentType[type],
        inDateTime,
        orderNumber
    }
    return warehouseShipment;
}
