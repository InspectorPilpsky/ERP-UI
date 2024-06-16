import { managementApi } from "..";
import { TechCard } from "@domain/TechCard";
import { Boxing } from "@app/pages/Manufactoring/types";
import { WarehouseStockType } from "@domain/Warehouse/WarehouseStock";


type PresaleRequest = {
    name: string,
    count: number,
    items: Array<{id: number, type: WarehouseStockType, qty: number}>
};

export async function startPresaleProcess(
    name: string,
    techCard: TechCard, 
    quantity: number, 
    boxing: Boxing[]): Promise<number> {

    if(techCard.id === null) throw new Error("Не, ну это поминки")

    const item = {id: techCard.id, type: WarehouseStockType.CARD, qty: 1}

    const items = boxing.map( b => ({id: b.component?.id || 0, type: WarehouseStockType.COMPONENT, qty: b.quantity }))

    const url = "/data/start/presale"

    const res = await managementApi.post<number,PresaleRequest >(url, {
        name,
        count: quantity,
        items: [item, ...items]
    });
    
    return(res);

}