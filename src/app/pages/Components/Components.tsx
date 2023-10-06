import { useCallback, useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination'
import styles from './styles.module.css'
import { Component } from '../../../api/Components/domain/Component';
import { getComponents } from '../../../api/Components/getComponents';
import { PAGEABLE_DEFAULT, PageableWrapper } from '../../../api/pageable';
import Drawer from '../../components/Drawer/Drawer';
import Button from '../../components/Button/Button';
import Search from '../../components/Search/Search';
import ComponentsTable from './components/ComponentsTable/ComponentsTable';

const PAGE_SIZE = 5;

export default function Components() {

    const [components, setComponents] = useState<PageableWrapper<Component[]>>(PAGEABLE_DEFAULT);

    const [componentInfo, setComponentInfo] = useState<Component | null>(null);

    const [page, setPage] = useState(0);

    const handleComponentClick = useCallback((component: Component) => {
        setComponentInfo(component);
    }, [])

    const handlePageChange = useCallback((page: number) => {setPage(page)}, []);

    const request = useCallback(() => {
        getComponents(page, PAGE_SIZE)
            .then(res => setComponents(res));
    }, [page])

    useEffect(() => request(), [request])

    return (
        <div className={styles.pageWrapper}>
            {componentInfo &&
                <Drawer
                    category={componentInfo.category.name}
                    onClose={() => setComponentInfo(null)}
                >
                    <span>
                        {componentInfo.name}
                    </span>
                </Drawer>}
            <div className={styles.components}>
                <div className={styles.header}>
                    <div className={styles.headerTitle}>Компоненты</div>
                    <div className={styles.headerFilters}>
                        <Search></Search>
                        <Button onClick={() => console.log("test")}>Поиск</Button>
                    </div>
                </div>
                <ComponentsTable
                    onClick={handleComponentClick}>
                    {components.content}
                </ComponentsTable>
            </div>
            <div className={styles.pagination}>
                <Pagination pageable={components} onChange={handlePageChange} />
            </div>
        </div>
    )
}