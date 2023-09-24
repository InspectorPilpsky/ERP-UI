import { CategoryDTO } from "../../Categories/dto/Category.dto"

export type ComponentDTO = {
    id: number | null,
    name: string,
    unit: string,
    code: string,
    stock: number,
    category: CategoryDTO
}