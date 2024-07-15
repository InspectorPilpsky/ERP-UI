import { CustomerDTO } from "@api/Customers/dto/Customer.dto";
import { Customer } from "@domain/Customers";

export function customerDtoToCustomer(customerDto: CustomerDTO): Customer {
  const { id, title, name, lastName, phone, balance } = customerDto;

  return { id: id ?? null, title, name, lastName, phone, balance };
}
