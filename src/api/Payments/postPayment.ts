//arriving
import { managementApi } from "@api/api";
import { PaymentDTO } from "@api/Payments/dto/Payment.dto";

export async function postPayment(payment: PaymentDTO): Promise<number> {
  const res = await managementApi.post<number, PaymentDTO>(
    "/api/v1/payment",
    payment
  );

  return res;
}
