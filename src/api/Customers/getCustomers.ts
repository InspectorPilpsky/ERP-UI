import { CustomerDTO } from "@api/Customers/dto/Customer.dto";
import { customerDtoToCustomer } from "@api/Customers/transformers/fromDto";
import { customersApi } from "@api/api";
import { PageableWrapper } from "@api/pageable";
import { Customer } from "@domain/Customers";

type GetCustomersResponse = PageableWrapper<CustomerDTO[]>;

function transformResponse(
  res: GetCustomersResponse
): PageableWrapper<Customer[]> {
  return {
    ...res,
    content: res.content.map(customerDtoToCustomer),
  };
}

export async function getCustomers(
  page: number,
  size: number
): Promise<PageableWrapper<Customer[]>> {
  const res = await customersApi.get<GetCustomersResponse>("/api/v1/customer", {
    query: { page, size, showBalance: true },
  });

  return transformResponse(res);
}
