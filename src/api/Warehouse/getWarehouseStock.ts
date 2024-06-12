import { warehouseApi } from "@api/api";
import { WarehouseStock, WarehouseStockType } from "@domain/Warehouse/WarehouseStock";
import { WarehouseStockDTO } from "./dto/WarehouseStock.dto";
import { fromWarehouseStockDTOToWarehouseStock } from "./transformers/fromDto";

/*

// Когда- нибудь тут появится панинация

export async function getWarehouseStock(): Promise<PageableWrapper<WarehouseStock[]>> {

    const res = await warehouseApi.get<PageableWrapper<WarehouseStockDTO[]>>("api/v1/warehouse/stock");
    
    const content = res.content.map(warehouseStockDto => fromWarehouseStockDTOToWarehouseStock(warehouseStockDto))
    
    return({...res, content});

}
*/

export async function getWarehouseStock(type: WarehouseStockType | null): Promise<WarehouseStock[]> {

    const res = await warehouseApi.get<WarehouseStockDTO[]>("api/v1/warehouse/stock", {query: {unitType: type}});
    
    const content = res.map(warehouseStockDto => fromWarehouseStockDTOToWarehouseStock(warehouseStockDto))
    
    return(content);

}