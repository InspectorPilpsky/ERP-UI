import { useCallback, useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination'
import styles from './styles.module.css'
import { Component } from '../../../api/Components/domain/Component';
import { getComponents } from '../../../api/Components/getComponents';
import { PAGEABLE_DEFAULT, PageableWrapper } from '../../../api/pageable';

export default function Components() {

    const [components, setComponents] = useState<PageableWrapper<Component[]>>(PAGEABLE_DEFAULT);

    const request = useCallback(() => {
        getComponents()
            .then(res => setComponents(res));
    }, [])

    useEffect(() => request(), [])

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.components}>
                <div className={styles.header}>
                </div>
                <div className={styles.table}>
                    <div className={styles.tableHeader}>
                        <div>Наименование</div>
                        <div>Единицы измерения</div>
                        <div>Категория</div>
                        <div>Код</div>
                        <div>Наличие</div>
                    </div>
                    {components.content
                        .map(component => {
                            const {name, unit, category, code, stock} = component;
                            const values = Object.values({
                                name,
                                unit,
                                category: category.name,
                                code,
                                stock
                            })
                            return <TableRow>{values}</TableRow>
                        }
                        )
                    }
                </div>

            </div>
            <div className={styles.pagination}>
                <Pagination />
            </div>
        </div>
    )
}

interface RowProps {
    children: React.ReactNode[];
}

function TableRow({ children }: RowProps) {

    return (
        <div className={styles.tableRow}>
            {children.map(cell =>
                <div>{cell}</div>)
            }
        </div>
    )
}