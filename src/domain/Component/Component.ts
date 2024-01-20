import { Category } from "@domain/Category";

export interface Component {
    id: number | null,
    name: string,
    unit: string,
    code: string,
    stock: number,
    category: Category
}