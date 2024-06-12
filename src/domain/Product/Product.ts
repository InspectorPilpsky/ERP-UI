export interface Product {
    id: number | null,
    name: string,
    unit: string,
    code: string,
    stock: number
}

export const DEFAULT_PRODUCT: Product = {
    id: null,
    name: '',
    unit: '',
    code: '',
    stock: 0
}