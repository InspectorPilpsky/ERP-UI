import { useCallback, useEffect, useState } from "react";
import Card from "./components/Card/Card";
import styles from './styles.module.css'
import { getCategories } from "../../../api/Categories/getCategories";
import { Category } from "../../../api/Categories/domain/Category";
import { PAGEABLE_DEFAULT, PageableWrapper } from "../../../api/pageable";
import Pagination from "../../components/Pagination/Pagination";
import AddCategory from "./components/AddCategory/AddCategory";
import { addCategory } from "../../../api/Categories/addCategory";

export default function Categories() {
    const [categories, setCategories] = useState<PageableWrapper<Category[]>>(PAGEABLE_DEFAULT)

    const [editCategory, setEditCategory] = useState<Category>({
        id: null,
        name: "",
        quantity: 0
    })

    const request = useCallback(() => {
        getCategories()
            .then(res => setCategories(res));
    }, [])

    const handleCategoryEdit = useCallback((categoryName: string) => {
        setEditCategory(prev => ({ ...prev, name: categoryName }))
    }, [])

    const handleAddCategory = useCallback(() => {
        addCategory(editCategory)
            .finally(() => request())
    }, [])

    useEffect(() => {
        request()
    }, [])

    return (
        <div className={styles.pageWrapper}>

            <div className={styles.categories}>
                <div className={styles.title}>Категории</div>
                <div className={styles.categoriesGrid}>
                    {categories?.content.map(c => <Card qty={c.quantity}>{c.name}</Card>)}
                    <AddCategory
                        category={editCategory}
                        onChange={handleCategoryEdit}
                        onAdd={handleAddCategory}
                    />
                </div>
            </div>
            <div className={styles.pagination}>
                <Pagination pageable={categories} />
            </div>

        </div>
    )
}