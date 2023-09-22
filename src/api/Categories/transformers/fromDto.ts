import { Category } from "../domain/Category";
import { CategoryDTO } from "../dto/Category.dto";

export function categoryDTOToCategory(categoryDto: CategoryDTO): Category {
    const {id, name, qty} = categoryDto;
    return {
        id,
        name,
        quantity: qty
    }
}