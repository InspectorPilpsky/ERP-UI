import { useCallback, useEffect, useState } from "react";
import Card from "./components/Card/Card";
import styles from './styles.module.css'
import { getCategories } from "../../../api/Categories/getCategories";
import { Category } from "../../../domain/Category";
import { PAGEABLE_DEFAULT, PageableWrapper } from "../../../api/pageable";
import AddCategory from "./components/AddCategory/AddCategory";
import { addCategory } from "../../../api/Categories/addCategory";
import { Pagination, PaginationProps } from "@gravity-ui/uikit";
import { Card as GravityCard } from '@gravity-ui/uikit';
import { deleteCategory } from "../../../api/Categories/deleteCategory";

export default function Categories() {
    const [categories, setCategories] = useState<PageableWrapper<Category[]>>(PAGEABLE_DEFAULT)

    const [pageState, setPageState] = useState({ page: 1, pageSize: 11 });
    const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>
        setPageState((prevState) => ({ ...prevState, page, pageSize }));

    const [editCategory, setEditCategory] = useState<Category>({
        id: null,
        name: "",
        quantity: 0
    })

    const request = useCallback(() => {
        getCategories(pageState.page - 1, pageState.pageSize)
            .then(res => setCategories(res));
    }, [pageState.page, pageState.pageSize])

    const handleCategoryEdit = useCallback((categoryName: string) => {
        setEditCategory(prev => ({ ...prev, name: categoryName }))
    }, [])

    const handleCategoryDelete = useCallback((id: Category["id"]) => {
        deleteCategory(id)
        .then(() => {
            request();
        })
    }, [request])

    const handleAddCategory = useCallback(() => {
        addCategory(editCategory)
            .finally(() => request())
    }, [editCategory, request])

    useEffect(() => {
        request()
    }, [request])

    return (
        <div className={styles.pageWrapper}>
            <GravityCard view="raised" className={styles.categories}>
                <div className={styles.title}>Категории</div>
                <div className={styles.categoriesGrid}>
                    {categories?.content.map(c =>
                        <Card
                            key={c.id}
                            qty={c.quantity}
                            onDelete={() => handleCategoryDelete(c.id)}>
                            {c.name}
                        </Card>)
                    }
                    <AddCategory
                        category={editCategory}
                        onChange={handleCategoryEdit}
                        onAdd={handleAddCategory}
                    />
                </div>
            </GravityCard>
            <div className={styles.pagination}>
                <Pagination
                    compact={false}
                    page={pageState.page}
                    pageSize={pageState.pageSize}
                    pageSizeOptions={[10, 50, 100]}
                    total={categories.totalElements}
                    onUpdate={handleUpdate} />
            </div>

        </div>
    )
}