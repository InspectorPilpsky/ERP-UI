import { Component, DEFAULT_COMPONENT } from "@domain/Component"

export enum WarehouseShipmentType {
    CARD = "CARD",
    COMPONENT = "COMPONENT"
}

export enum WarehouseShipmentAction {
    INCOME = "INCOME",
    OUTCOME = "OUTCOME"
}

export type WarehouseShipment = {
    action:	WarehouseShipmentAction,
    amount:	number,
    cost: number,
    type: WarehouseShipmentType,
    childId: number,
    orderNumber: string,
    inDateTime: string,
    component: Component
}

export const DEFAULT_WAREHOUSE_SHIPMENT: WarehouseShipment = {
    action: WarehouseShipmentAction.INCOME,
    amount: 0,
    cost: 0,
    type: WarehouseShipmentType.COMPONENT,
    childId: 0,
    orderNumber: "",
    inDateTime: "",
    component: DEFAULT_COMPONENT
}