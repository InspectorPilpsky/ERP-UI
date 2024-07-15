import { CustomerDTO } from "@api/Customers/dto/Customer.dto";
import { ProductDTO } from "@api/Product/dto/Product.dto";
import { WarehouseStockDTO } from "@api/Warehouse/dto/WarehouseStock.dto";

export type DeliveryDTO = {
  id: number;
  customerId: CustomerDTO["id"];
  productId: ProductDTO["id"];
  unitType: WarehouseStockDTO["type"];
  qty: number;
  price: number;
  direction: "DELIVERY" | "ARRIVING";
  deliveryTime: string;
};
