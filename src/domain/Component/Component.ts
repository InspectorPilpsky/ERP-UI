import { Category } from "@domain/Category";

export interface Component {
    id: number | null,
    name: string,
    unit: string,
    code: string,
    stock: number,
    category: Category
}

export const DEFAULT_COMPONENT: Component = {
    id: null,
    name: '',
    unit: '',
    code: '',
    stock: 0,
    category: {
        id: null,
        name: '',
        quantity: 0
    }
}