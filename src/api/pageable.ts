export interface PageableWrapper<T> {
    number: number,
    size: number,
    totalElements: number,
    totalPages: number,
    content: T
}

export interface Pageable {
    number: number,
    size: number,
    totalElements: number,
    totalPages: number,
    content: any
}

export const PAGEABLE_DEFAULT: Pageable = {
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
    content: []
}