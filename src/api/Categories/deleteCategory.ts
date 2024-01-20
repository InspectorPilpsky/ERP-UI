import { Category } from "@domain/Category";
import { techCardsApi } from "../api";

export async function deleteCategory(id: Category["id"]): Promise<boolean> {
    const res = await techCardsApi.delete<boolean, object>(`/api/v1/directory/category/${id}`);
    return res;
}