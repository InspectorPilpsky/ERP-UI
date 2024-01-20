import { useCallback, useEffect, useState } from 'react';
import styles from './styles.module.css'
import { Button, Card, Icon, Pagination, PaginationProps, Table, TextInput } from '@gravity-ui/uikit';
import { Magnifier, Plus } from '@gravity-ui/icons';
import TechCardInfo from './components/TechCard/Info/TechCardInfo';
import { PAGEABLE_DEFAULT, PageableWrapper } from '@api/pageable';
import { TechCard } from '@domain/TechCard';
import { getTechCards } from '@api/TechCards';

export default function TechCards() {

    const [techCards, setTechCards] = useState<PageableWrapper<TechCard[]>>(PAGEABLE_DEFAULT);

    const [techCardInfo, setTechCardInfo] = useState<TechCard | null>(null);

    const [pageState, setPageState] = useState({ page: 1, pageSize: 10 });

    const handleTechCardClick = useCallback((techCard: TechCard) => {
        setTechCardInfo(techCard);
    }, [])

    const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>
        setPageState((prevState) => ({ ...prevState, page, pageSize }));

    const request = useCallback(() => {
        getTechCards(pageState.page - 1, pageState.pageSize)
            .then(res => setTechCards(res));
    }, [pageState.page, pageState.pageSize])

    useEffect(() => request(), [request])

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
                        <Button view="raised" size="xl">
                            <Icon data={Plus} />
                            Добавить
                        </Button>
                    </div>
                    <Card className={styles.techCardInfo}>
                        {!techCardInfo && "Ничего не выбрано"}
                        {techCardInfo && <TechCardInfo components={techCardInfo.components} />}
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