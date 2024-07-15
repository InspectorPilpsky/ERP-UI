import { customersApi } from "@api/api";
import { Customer } from "@domain/Customers";
import { CustomerDTO } from "@api/Customers/dto/Customer.dto";
import { customerToCustomerDto } from "@api/Customers/transformers/toDto";

export async function addCustomer(customer: Customer): Promise<number> {
  const customerDto = customerToCustomerDto(customer);

  const res = await customersApi.post<number, CustomerDTO>(
    "/api/v1/customer",
    customerDto
  );

  return res;
}
