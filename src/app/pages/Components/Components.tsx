import { useCallback, useEffect, useState } from 'react';
import styles from './styles.module.css'
import { Component } from '../../../api/Components/domain/Component';
import { getComponents } from '../../../api/Components/getComponents';
import { PAGEABLE_DEFAULT, PageableWrapper } from '../../../api/pageable';
import Drawer from '../../components/Drawer/Drawer';
import { Button, Pagination, PaginationProps, Table, TextInput } from '@gravity-ui/uikit';
import { Magnifier } from '@gravity-ui/icons';

export default function Components() {

    const [components, setComponents] = useState<PageableWrapper<Component[]>>(PAGEABLE_DEFAULT);

    const [componentInfo, setComponentInfo] = useState<Component | null>(null);

    const [pageState, setPageState] = useState({ page: 1, pageSize: 10, total: 1 });

    const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>
        setPageState((prevState) => ({ ...prevState, page, pageSize }));

    const handleComponentClick = useCallback((component: Component) => {
        setComponentInfo(component);
    }, []);

    const request = useCallback(() => {
        getComponents(pageState.page - 1, pageState.pageSize)
            .then(res => setComponents(res));
    }, [pageState])

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
                        <TextInput
                            size="xl"
                            placeholder='Найти'
                            leftContent={<Magnifier color='#BDBDBD' />}
                        />
                        <Button
                            size="xl"
                            onClick={() => console.log("test")}>
                            Поиск
                        </Button>
                    </div>
                </div>
                <Table
                    className={styles.componentsTable}
                    data={components.content}
                    columns={[
                        { id: "name", name: "Наименование" },
                        { id: "unit", name: "Единицы измерения" },
                        { id: "category", name: "Категория", template: (data) => data.category.name },
                        { id: "code", name: "Код" },
                        { id: "stock", name: "Наличие" },
                    ]}
                    onRowClick={handleComponentClick}
                />
                {/* <ComponentsTable
                    onClick={handleComponentClick}>
                    {components.content}
                </ComponentsTable> */}
            </div>
            <div className={styles.pagination}>
                <Pagination
                    compact={false}
                    page={pageState.page}
                    pageSize={pageState.pageSize}
                    pageSizeOptions={[10, 50, 100]}
                    total={components.totalElements}
                    onUpdate={handleUpdate} />
            </div>
        </div>
    )
}