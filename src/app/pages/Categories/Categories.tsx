import { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import styles from './styles.module.css'
import { getCategories } from "../../../api/Categories/getCategories";
import { Category } from "../../../api/Categories/domain/Category";
import { PAGEABLE_DEFAULT, PageableWrapper } from "../../../api/pageable";
import Pagination from "../../components/Pagination/Pagination";

export default function Categories() {
    const [categories, setCategories] = useState<PageableWrapper<Category[]>>(PAGEABLE_DEFAULT)

    useEffect(() => {
        getCategories()
            .then(res => setCategories(res));
    }, [])
    return (
        <div className={styles.pageWrapper}>

            <div className={styles.categories}>
                <div className={styles.title}>Категории</div>
                <div className={styles.categoriesGrid}>
                    {categories?.content.map(c => <Card qty={c.quantity}>{c.name}</Card>)}
                    <Card add />
                </div>
            </div>
            <div className={styles.pagination}>
                <Pagination pageable={categories} />
            </div>

        </div>
    )
}