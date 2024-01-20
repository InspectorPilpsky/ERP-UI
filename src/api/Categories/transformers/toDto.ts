import { Category } from "../../../domain/Category";
import { CategoryDTO } from "../dto/Category.dto";

export function categoryToCategoryDTO(category: Category): CategoryDTO {
    const {id, name, quantity} = category;
    return {
        id,
        name,
        qty: quantity
    }
}