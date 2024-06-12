import { ProductDTO } from "../dto/Product.dto";
import { Product } from "@domain/Product";

export function productDTOToProduct(productDto: ProductDTO): Product {
  const { id, name, unit, code, stock } = productDto;
  return {
    id,
    name,
    unit,
    code,
    stock,
  };
}
