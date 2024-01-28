import { warehouseApi } from "..";
import { WarehouseShipment, WarehouseShipmentAction } from "@domain/Warehouse/WarehouseShipment";
import { WarehouseShipmentDTO } from "./dto/WarehouseShipment.dto";


type AddShipmentRequest = Pick<WarehouseShipmentDTO, 'amount' | 'cost' | 'childId' | 'type' | 'orderNumber'>;

export async function addWarehouseShipment(shipment: WarehouseShipment): Promise<number> {

    const {amount, cost, childId, type, orderNumber} = shipment;

    const url = shipment.action === WarehouseShipmentAction.INCOME ? "api/v1/warehouse/add" : "api/v1/warehouse/seize"

    const res = await warehouseApi.post<number,AddShipmentRequest >(url, {
        amount,
        cost,
        childId,
        type,
        orderNumber
    });
    
    return(res);

}