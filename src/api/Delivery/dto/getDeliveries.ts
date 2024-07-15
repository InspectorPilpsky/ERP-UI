import { DeliveryDTO } from "@api/Delivery/dto/Delivery.dto";
import { managementApi } from "@api/api";
import { PageableWrapper } from "@api/pageable";
import { Customer } from "@domain/Customers";

type GetCustomersResponse = PageableWrapper<DeliveryDTO[]>;

function transformResponse(
  res: GetCustomersResponse
): PageableWrapper<DeliveryDTO[]> {
  return {
    ...res,
    content: res.content,
  };
}

export async function getDeliveries(
  customerId: Customer["id"],
  page: number,
  size: number
): Promise<PageableWrapper<DeliveryDTO[]>> {
  const res = await managementApi.get<GetCustomersResponse>(
    `/api/v1/delivery/${customerId}`,
    {
      query: { page, size },
    }
  );

  return transformResponse(res);
}
