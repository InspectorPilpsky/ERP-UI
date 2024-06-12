import { WarehouseShipment } from "@domain/Warehouse/WarehouseShipment";
import { warehouseApi } from "../api";
import { PageableWrapper } from "../pageable";
import { fromWarehouseShipmentDTOToWarehouseShipment } from "./transformers/fromDto";
import { WarehouseShipmentDTO } from "./dto/WarehouseShipment.dto";

type GetWarehouseShipmentsResponse = PageableWrapper<WarehouseShipmentDTO[]>;

function transformResponse(res: GetWarehouseShipmentsResponse): PageableWrapper<WarehouseShipment[]> {
    return {
        ...res,
        content: res.content.map(fromWarehouseShipmentDTOToWarehouseShipment)
        // .filter(shipment => shipment.type !== "CARD")
    }
}

export async function getWarehouseShipments(page: number, size: number): Promise<PageableWrapper<WarehouseShipment[]>> {
    const res = await warehouseApi.get<PageableWrapper<WarehouseShipmentDTO[]>>("/api/v1/warehouse", {query: {page, size}});
    return transformResponse(res);
}