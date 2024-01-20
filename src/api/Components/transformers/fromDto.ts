import { categoryDTOToCategory } from "../../Categories/transformers/fromDto";
import { Component } from "../../../domain/Component";
import { ComponentDTO } from "../dto/Component.dto";

export function componentDTOToComponent(componentDto: ComponentDTO): Component {
  const { id, name, unit, code, stock, category } = componentDto;
  return {
    id,
    name,
    unit,
    code,
    stock,
    category: categoryDTOToCategory(category)
  };
}
