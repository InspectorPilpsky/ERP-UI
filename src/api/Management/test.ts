import { TechCard } from "@domain/TechCard";
import { managementApi } from "../api";
import { Category } from "@domain/Category";

export async function startProcess(cardId: TechCard["id"], quantity: Category["quantity"]): Promise<number> {
    const res = await managementApi.post<number, {cardId: TechCard["id"], qty: Category["quantity"]}>("/data", {cardId, qty: quantity}, {query: {cardId, qty: quantity}});
    return res;
}