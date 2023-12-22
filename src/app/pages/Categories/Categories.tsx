import { useCallback, useEffect, useState } from "react";
import Card from "./components/Card/Card";
import styles from './styles.module.css'
import { getCategories } from "../../../api/Categories/getCategories";
import { Category } from "../../../api/Categories/domain/Category";
import { PAGEABLE_DEFAULT, PageableWrapper } from "../../../api/pageable";
import AddCategory from "./components/AddCategory/AddCategory";
import { addCategory } from "../../../api/Categories/addCategory";
import { Pagination, PaginationProps } from "@gravity-ui/uikit";
import { Card as GravityCard} from '@gravity-ui/uikit';

export default function Categories() {
    const [categories, setCategories] = useState<PageableWrapper<Category[]>>(PAGEABLE_DEFAULT)

    const [pageState, setPageState] = useState({ page: 1, pageSize: 10 });
    const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>
        setPageState((prevState) => ({ ...prevState, page, pageSize }));

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

            {/* <div className={styles.categories}> */}
            <GravityCard view="raised" className={styles.categories}> 
                <div className={styles.title}>Категории</div>
                <div className={styles.categoriesGrid}>
                    {categories?.content.map(c => <Card qty={c.quantity}>{c.name}</Card>)}
                    <AddCategory
                        category={editCategory}
                        onChange={handleCategoryEdit}
                        onAdd={handleAddCategory}
                    />
                </div>
            </GravityCard>
            {/* </div> */}
            <div className={styles.pagination}>
                <Pagination
                    compact={false}
                    page={pageState.page}
                    pageSize={pageState.pageSize}
                    pageSizeOptions={[10, 50, 100]}
                    total={100}
                    onUpdate={handleUpdate} />
            </div>

        </div>
    )
}