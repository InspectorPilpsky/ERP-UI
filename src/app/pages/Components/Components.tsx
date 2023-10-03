import { useCallback, useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination'
import styles from './styles.module.css'
import { Component } from '../../../api/Components/domain/Component';
import { getComponents } from '../../../api/Components/getComponents';
import { PAGEABLE_DEFAULT, PageableWrapper } from '../../../api/pageable';
import Drawer from '../../components/Drawer/Drawer';
import Button from '../../components/Button/Button';
import Search from '../../components/Search/Search';

export default function Components() {

    const [components, setComponents] = useState<PageableWrapper<Component[]>>(PAGEABLE_DEFAULT);

    const request = useCallback(() => {
        getComponents()
            .then(res => setComponents(res));
    }, [])

    useEffect(() => request(), [])

    return (
        <div className={styles.pageWrapper}>
            {/* <Drawer /> */}
            <div className={styles.components}>
                <div className={styles.header}>
                    <div className={styles.headerTitle}>Компоненты</div>
                    <div className={styles.headerFilters}>
                        <Search></Search>
                        <Button onClick={() => console.log("test")}>Поиск</Button>
                    </div>
                </div>
                <table className={styles.componentsTable}>
                    <thead>
                        <tr>
                            <th>Наименование</th>
                            <th>Единицы измерения</th>
                            <th>Категория</th>
                            <th>Код</th>
                            <th>Наличие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {components.content
                            .map(component => {
                                const { id, name, unit, category, code, stock } = component;
                                const values = Object.values({
                                    name,
                                    unit,
                                    category: category.name,
                                    code,
                                    stock
                                })
                                return <tr key={id}>{values.map((v, key) => <td key={key}>{v}</td>)}</tr>
                            }
                            )
                        }
                    </tbody>
                </table>

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