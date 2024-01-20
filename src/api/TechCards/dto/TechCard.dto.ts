import { ComponentDTO } from "../../Components/dto/Component.dto"

export type TechCardDTO = {
    id: number | null,
    name: string,
    code: string,
    stock: number,
    components: {
        id: number,
        qty: number,
        component: ComponentDTO
    }[]
}