import { Component } from "../../Components/domain/Component"

export type TechCard = {
    id: number | null,
    name: string,
    code: string,
    components: {
        id: number,
        quantity: number,
        component: Component
    }[]
}