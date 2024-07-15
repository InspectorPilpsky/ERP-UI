import { PaymentDTO } from "@api/Payments/dto/Payment.dto";
import { managementApi } from "@api/api";
import { PageableWrapper } from "@api/pageable";
import { Customer } from "@domain/Customers";

type GetCustomersResponse = PageableWrapper<PaymentDTO[]>;

function transformResponse(
  res: GetCustomersResponse
): PageableWrapper<PaymentDTO[]> {
  return {
    ...res,
    content: res.content,
  };
}

export async function getPayments(
  customerId: Customer["id"],
  page: number,
  size: number
): Promise<PageableWrapper<PaymentDTO[]>> {
  const res = await managementApi.get<GetCustomersResponse>(
    `/api/v1/payment/${customerId}`,
    {
      query: { page, size },
    }
  );

  return transformResponse(res);
}
