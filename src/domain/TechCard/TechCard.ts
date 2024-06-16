import { Component } from "../Component"

export type TechCard = {
    id: number | null,
    name: string,
    code: string,
    stock: number,
    components: {
        id: number,
        quantity: number,
        component: Component
    }[]
}

export type TechCardWithUndefComponent = {
    id: number | null,
    name: string,
    code: string,
    stock: number,
    components: {
        id: number | null,
        quantity: number,
        component: Component | null
    }[]
}
