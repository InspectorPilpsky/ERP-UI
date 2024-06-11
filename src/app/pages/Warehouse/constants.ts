import { WarehouseStockType } from "@domain/Warehouse/WarehouseStock";

export const warehouseStockTypeMap: Record<WarehouseStockType, string> = {
    [WarehouseStockType.CARD]: "Изделие",
    [WarehouseStockType.COMPONENT]: "Компонент",
    [WarehouseStockType.PRODUCT]: "Продукт"
}