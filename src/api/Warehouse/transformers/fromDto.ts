import { componentDTOToComponent } from "@api/Components/transformers/fromDto";
import { WarehouseStockDTO } from "../dto/WarehouseStock.dto";
import { WarehouseStock } from "@domain/Warehouse/WarehouseStock";
import { WarehouseShipment, WarehouseShipmentAction, WarehouseShipmentType } from "@domain/Warehouse/WarehouseShipment";
import { WarehouseShipmentDTO } from "../dto/WarehouseShipment.dto";

export function fromWarehouseStockDTOToWarehouseStock(warehouseStockDto: WarehouseStockDTO): WarehouseStock {
    const {amount, cost, childId, componentDto, type} = warehouseStockDto;
    const component = componentDTOToComponent(componentDto);
    const warehouseStock = {
        amount,
        cost,
        childId,
        type,
        component
    }
    return warehouseStock;
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
        type: type === "CARD" ? WarehouseShipmentType.CARD : WarehouseShipmentType.COMPONENT,
        inDateTime,
        orderNumber
    }
    return warehouseShipment;
}