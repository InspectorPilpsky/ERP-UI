import { WarehouseStock } from "@domain/Warehouse/WarehouseStock";
import { PageableWrapper, warehouseApi } from "..";
import { WarehouseStockDTO } from "./dto/WarehouseStock.dto";
import { fromWarehouseStockDTOToWarehouseStock } from "./transformers/fromDto";

export async function getWarehouseStock(): Promise<PageableWrapper<WarehouseStock[]>> {

    const res = await warehouseApi.get<PageableWrapper<WarehouseStockDTO[]>>("api/v1/warehouse/stock");
    
    const content = res.content.map(warehouseStockDto => fromWarehouseStockDTOToWarehouseStock(warehouseStockDto))
    
    return({...res, content});

}