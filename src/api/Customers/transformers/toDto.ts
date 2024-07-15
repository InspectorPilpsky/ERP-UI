import { CustomerDTO } from "@api/Customers/dto/Customer.dto";
import { Customer } from "@domain/Customers";

export function customerToCustomerDto(customer: Customer): CustomerDTO {
  const { id, title, name, lastName, phone, balance } = customer;

  return { id: id ?? undefined, title, name, lastName, phone, balance };
}
