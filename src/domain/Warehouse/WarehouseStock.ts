import { Component, DEFAULT_COMPONENT } from "@domain/Component"
import { TechCard } from ".."

export enum WarehouseStockType {
    COMPONENT = "COMPONENT",
    CARD = "CARD"
}

interface AbstractWarehouseStock {
    amount: number,
    cost: number,
    childId: number
}

export interface WarehouseCardStock extends AbstractWarehouseStock {
    type: WarehouseStockType.CARD,
    techCard: TechCard
}

export interface WarehouseComponentStock extends AbstractWarehouseStock {
    type: WarehouseStockType.COMPONENT,
    component: Component
}

export type WarehouseStock = WarehouseCardStock | WarehouseComponentStock;

export const DEFAULT_WAREHOUSE_STOCK: WarehouseStock = {
    amount: 0,
    cost: 0,
    type: WarehouseStockType.COMPONENT,
    childId: 0,
    component: DEFAULT_COMPONENT
}