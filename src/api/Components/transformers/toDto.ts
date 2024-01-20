import { categoryToCategoryDTO } from "../../Categories/transformers/toDto";
import { Component } from "../../../domain/Component";
import { ComponentDTO } from "../dto/Component.dto";

export function componentTocomponentDTO(component: Component): ComponentDTO {
  const { id, name, unit, code, stock, category } = component;
  return {
    id,
    name,
    unit,
    code,
    stock,
    category: categoryToCategoryDTO(category)
  };
}
