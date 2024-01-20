import { useCallback, useEffect, useState } from 'react';
import styles from './styles.module.css'
import { Button, Card, Icon, Pagination, PaginationProps, Table, TextInput } from '@gravity-ui/uikit';
import { Magnifier, Plus } from '@gravity-ui/icons';
import { PAGEABLE_DEFAULT, PageableWrapper } from '@api/pageable';
import { TechCard as TechCardType } from '@domain/TechCard';
import { getTechCards } from '@api/TechCards';
import TechCard from './components/TechCard/TechCard';
import { Component } from '@domain/Component';
import { getComponents } from '@api/Components';
import { saveTechCard } from '@api/TechCards/saveTechCards';

const DEFAULT_TECH_CARD: TechCardType = {
    "id": null,
    "name": "Наименование",
    "code": "Код",
    "stock": 1,
    "components": [
        {
            "id": 1,
            "component": {
                "id": 1,
                "name": "white textile",
                "unit": "metr",
                "category": {
                    "id": 1,
                    "name": "textile",
                    "quantity": 2
                },
                "code": "tk01",
                "stock": 1
            },
            "quantity": 5.0
        }
    ]
}

export default function TechCards() {

    const [techCards, setTechCards] = useState<PageableWrapper<TechCardType[]>>(PAGEABLE_DEFAULT);

    const [components, setComponents] = useState<PageableWrapper<Component[]>>(PAGEABLE_DEFAULT);

    const [techCardInfo, setTechCardInfo] = useState<TechCardType | null>(null);

    const [pageState, setPageState] = useState({ page: 1, pageSize: 10 });

    const handleTechCardClick = useCallback((techCard: TechCardType) => {
        setTechCardInfo(techCard);
    }, [])

    const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>
        setPageState((prevState) => ({ ...prevState, page, pageSize }));

    const handleSaveTechCard = useCallback((techCard: TechCardType) => {
        console.log('handleSaveTechCard', techCard);
        saveTechCard(techCard);
    }, [])

    const handleAddComponent = useCallback(() => {
        setTechCards(prev => ({...prev, content: [...prev.content, DEFAULT_TECH_CARD]})) 
    }, [])

    const request = useCallback(() => {
        getTechCards(pageState.page - 1, pageState.pageSize)
            .then(res => setTechCards(res));
    }, [pageState.page, pageState.pageSize])

    useEffect(() => request(), [request])

    useEffect(() => {
        getComponents(0, 9999, { categoryId: null, code: null })
            .then(res => setComponents(res));
    }, [])

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.techCards}>
                <div className={styles.header}>
                    <div className={styles.headerTitle}>Технологические карты</div>
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
                <div className={styles.techCardBoard}>
                    {/* <pre>{JSON.stringify(techCards, null, 2)}</pre> */}
                    <div className={styles.table}>
                        <Table
                            data={techCards.content}
                            columns={[
                                { id: "name", name: "Наименование" },
                                { id: "id", name: "Артикул" },
                                { id: "code", name: "Код" },
                            ]}
                            onRowClick={handleTechCardClick}
                        />
                        <Button view="raised" size="xl" onClick={handleAddComponent}>
                            <Icon data={Plus} />
                            Добавить
                        </Button>
                    </div>
                    <Card className={styles.techCardInfo}>
                        {!techCardInfo && "Ничего не выбрано"}
                        {techCardInfo &&
                            <>
                                <TechCard
                                    techCard={techCardInfo}
                                    componentsList={components.content}
                                    onSave={handleSaveTechCard}
                                />
                                <Button view="raised" size="l">Отправить в производство</Button>
                            </>
                        }
                    </Card>
                </div>
            </div>
            <div className={styles.pagination}>
                <Pagination
                    compact={false}
                    page={pageState.page}
                    pageSize={pageState.pageSize}
                    pageSizeOptions={[10, 50, 100]}
                    total={techCards.totalElements}
                    onUpdate={handleUpdate} />
            </div>
        </div>
    )
}