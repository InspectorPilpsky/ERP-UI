import { Category } from "@domain/Category";
import { PageableWrapper } from "../pageable";
import { CategoryDTO } from "./dto/Category.dto";
import { categoryDTOToCategory } from "./transformers/fromDto";
import { techCardsApi } from "@api/api";

type GetCategoriesResponse = PageableWrapper<CategoryDTO[]>;

function transformResponse(res: GetCategoriesResponse): PageableWrapper<Category[]> {
    return {
        ...res,
        content: res.content.map(categoryDTOToCategory)
    }
}

export async function getCategories(page: number, size: number): Promise<PageableWrapper<Category[]>> {
    const res = await techCardsApi.get<GetCategoriesResponse>("/api/v1/directory/category", {query: {page, size}});
    return transformResponse(res);
}