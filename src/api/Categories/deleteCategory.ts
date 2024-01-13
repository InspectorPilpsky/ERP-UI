import { techCardsApi } from "../api";
import { Category } from "./domain/Category";

export async function deleteCategory(id: Category["id"]): Promise<boolean> {
    const res = await techCardsApi.delete<boolean, object>(`/api/v1/directory/category/${id}`);
    return res;
}