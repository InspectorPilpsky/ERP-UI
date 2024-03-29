import { Category } from "@domain/Category";
import { CategoryDTO } from "./dto/Category.dto";
import { categoryDTOToCategory } from "./transformers/fromDto";
import { categoryToCategoryDTO } from "./transformers/toDto";
import { techCardsApi } from "@api/api";

type addCategoryResponse = CategoryDTO;

function transformRequest(req: Category): CategoryDTO {
    return categoryToCategoryDTO(req)
}

function transformResponse(res: CategoryDTO): Category {
    return categoryDTOToCategory(res)
}

export async function addCategory(category: Category): Promise<Category> {
    const req = transformRequest(category);
    const res = await techCardsApi.post<addCategoryResponse, CategoryDTO>("/api/v1/directory/category", req);
    return transformResponse(res);
}