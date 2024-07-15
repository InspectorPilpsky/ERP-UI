import { CustomerDTO } from "@api/Customers/dto/Customer.dto";

export type PaymentDTO = {
  id: number | undefined;
  customerId: CustomerDTO["id"];
  orderNumber: string;
  amount: number;
  direction: "DELIVERY" | "ARRIVING";
  deliveryTime: string | undefined;
};
