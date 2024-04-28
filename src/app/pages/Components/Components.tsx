import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './styles.module.css'
import { Component } from '../../../domain/Component';
import { ComponentFilter, getComponents } from '../../../api/Components/getComponents';
import { PAGEABLE_DEFAULT, PageableWrapper } from '../../../api/pageable';
import { Button, Icon, Pagination, PaginationProps, Select, Table, TextInput } from '@gravity-ui/uikit';
import { Magnifier, Plus } from '@gravity-ui/icons';
import { getCategories } from '../../../api/Categories/getCategories';
import { Category } from '../../../domain/Category';
import { useSearchParams } from 'react-router-dom';
import ComponentAddDrawer from './components/ComponentAddDrawer';
import { addComponent } from '../../../api/Components/addComponent';

const DEFAULT_CATEGORY: Category = {
    id: -1,
    name: 'Все',
    quantity: 0
}

export default function Components() {

    const [qParams, setQParams] = useSearchParams();

    const [filters, setFilters] = useState<ComponentFilter>({ code: null, categoryId: Number(qParams.get('categoryId')) || -1 });

    const [components, setComponents] = useState<PageableWrapper<Component[]>>(PAGEABLE_DEFAULT);

    const [addDrawerIsVisible, setAddDrawerIsVisible] = useState(false);

    const [categories, setCategories] = useState<Category[]>([DEFAULT_CATEGORY])
    
    const [pageState, setPageState] = useState({ page: 1, pageSize: 10, total: 1 });
    
    const categoryId = useMemo(() => filters.categoryId?.toString() || "-1", [filters.categoryId])
    
    const categoriesOpts: Array<{value: string, content: string}> = useMemo(() =>
        [
            { value: "-1", content: "Все" },
            ...categories.map((c) => ({ value: c.id?.toString() || "-1", content: `${c.name} (${c.quantity})` }))
        ], [categories])

    const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>
        setPageState((prevState) => ({ ...prevState, page, pageSize }));

    const request = useCallback(() => {
        getComponents(pageState.page - 1, pageState.pageSize, filters)
            .then(res => setComponents(res));
    }, [filters, pageState.page, pageState.pageSize])

    const addNewComponent = useCallback((component: Component) => {
        addComponent(component);
    }, [])

    useEffect(() => {

        const catId = Number(qParams.get("categoryId"));

        setFilters(prev => ({ ...prev, categoryId: catId > 0 ? catId : -1 }))
    }, [qParams])

    useEffect(() => request(), [request])

    useEffect(() => {
        getCategories(0, 1000)
            .then(res => setCategories(res.content))
    }, [])

    return (
        <div className={styles.pageWrapper}>
            <ComponentAddDrawer
                isVisible={addDrawerIsVisible}
                onAdd={addNewComponent}
                onClose={() => setAddDrawerIsVisible(false)} 
                categories={categories}
                categoriesOpts={categoriesOpts} />
            <div className={styles.components}>
                <div className={styles.header}>
                    <div className={styles.headerTitle}>
                        Компоненты
                        <Button
                            size="l"
                            view="action"
                            onClick={() => setAddDrawerIsVisible(true)}
                        >
                            <Icon data={Plus} />
                            Добавить
                        </Button>
                    </div>
                    <div className={styles.headerFilters}>
                        <Select
                            size='xl'
                            placeholder="Категория"
                            value={[categoriesOpts.find(opt => opt.value === categoryId)?.value || "-1"]}
                            options={categoriesOpts}
                            // onUpdate={([category]) => setFilters(prev => ({ ...prev, categoryId: Number(category) }))}
                            onUpdate={([category]) => setQParams({ categoryId: category })}
                        />
                        <TextInput
                            size="xl"
                            placeholder='Найти'
                            leftContent={<Magnifier color='#BDBDBD' />}
                        />
                        <Button
                            size="xl"
                            onClick={() => console.log("Поиск в разработке")}>
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
                        { id: "category", name: "Категория", template: (data) => data.category?.name },
                        { id: "code", name: "Код" },
                        { id: "stock", name: "Наличие" },
                    ]}
                />
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