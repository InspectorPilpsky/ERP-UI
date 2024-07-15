import { managementApi } from "@api/api";
import { Customer } from "@domain/Customers";
import { Product } from "@domain/Product";
import {
  WarehouseStock,
  WarehouseStockType,
} from "@domain/Warehouse/WarehouseStock";

type DeliveryDTO = {
  customerId: Customer["id"];
  productId: Product["id"];
  unitType: WarehouseStockType.PRODUCT;
  qty: WarehouseStock["amount"];
  price: number;
  direction: "DELIVERY";
};

export async function sendToCustomer(
  customerId: Customer["id"],
  productId: Product["id"],
  quantity: WarehouseStock["amount"],
  price: number
): Promise<number> {
  const res = await managementApi.post<number, DeliveryDTO>(
    "/api/v1/delivery",
    {
      customerId,
      productId,
      unitType: WarehouseStockType.PRODUCT,
      qty: quantity,
      price,
      direction: "DELIVERY",
    }
  );

  return res;
}
