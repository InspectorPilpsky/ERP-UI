import api from "../api";
import { Pageable } from "../pageable";
import { Category } from "./domain/Category";
import { CategoryDTO } from "./dto/Category.dto";
import { categoryDTOToCategory } from "./transformers/fromDto";

type GetCategoriesResponse = Pageable<CategoryDTO[]>;

function transformResponse(res: GetCategoriesResponse): Pageable<Category[]> {
    return {
        ...res,
        content: res.content.map(categoryDTOToCategory)
    }
}

export async function getCategories(): Promise<Pageable<Category[]>> {
    const res = await api.get<GetCategoriesResponse>("/api/v1/directory/category");
    return transformResponse(res);
}