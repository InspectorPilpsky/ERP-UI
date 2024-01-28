import { Component } from "@domain/Component"

export type WarehouseStock = {
    amount: number,
    cost: number,
    type: string,
    childId: number,
    component: Component
}