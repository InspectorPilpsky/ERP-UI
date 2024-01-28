import { Component, DEFAULT_COMPONENT } from "@domain/Component"

export type WarehouseStock = {
    amount: number,
    cost: number,
    type: string,
    childId: number,
    component: Component
}

export const DEFAULT_WAREHOUSE_STOCK: WarehouseStock = {
    amount: 0,
    cost: 0,
    type: "",
    childId: 0,
    component: DEFAULT_COMPONENT
}