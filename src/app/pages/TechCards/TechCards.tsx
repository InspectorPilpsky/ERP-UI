import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './styles.module.css'
import { Button, Card, Icon, Pagination, PaginationProps, Table, TextInput } from '@gravity-ui/uikit';
import { Magnifier, Plus } from '@gravity-ui/icons';
import { PAGEABLE_DEFAULT, PageableWrapper } from '@api/pageable';
import { TechCard as TechCardType } from '@domain/TechCard';
import { getTechCards } from '@api/TechCards';
import TechCardView from './components/TechCard/TechCardView';
import { Component } from '@domain/Component';
import { getComponents } from '@api/Components';
import { saveTechCard } from '@api/TechCards/saveTechCard';
import { deleteTechCard } from '@api/TechCards/deleteTechCard';
import { startProcess } from '@api/Management';

const DEFAULT_TECH_CARD: TechCardType = {
    "id": null,
    "name": "Наименование",
    "code": "Код",
    "stock": 1,
    "components": []
}

export default function TechCards() {

    const [techCards, setTechCards] = useState<PageableWrapper<TechCardType[]>>(PAGEABLE_DEFAULT);

    const [components, setComponents] = useState<PageableWrapper<Component[]>>(PAGEABLE_DEFAULT);

    const [techCardInfo, setTechCardInfo] = useState<TechCardType | null>(null);

    const [pageState, setPageState] = useState({ page: 1, pageSize: 10 });

    const [mode, setMode] = useState<"INFO" | "EDIT">("INFO");

    const handleTechCardClick = useCallback((techCard: TechCardType) => {
        setTechCardInfo(techCard);
    }, [])

    const handleUpdate: PaginationProps['onUpdate'] = (page: number, pageSize: number) =>
        setPageState((prevState) => ({ ...prevState, page, pageSize }));

    const request = useCallback(() => {
        getTechCards(pageState.page - 1, pageState.pageSize)
            .then(res => setTechCards(res));
    }, [pageState.page, pageState.pageSize])

    const handleSaveTechCard = useCallback((techCard: TechCardType) => {
        saveTechCard(techCard)
            .then(() => { request(); setMode("INFO") });
    }, [request])

    const handleDeleteTechCard = useCallback((techCard: TechCardType) => {
        deleteTechCard(techCard.id)
            .finally(() => { 
                request();
                setMode("INFO");
                if(techCards.content[0] !== undefined) {
                    handleTechCardClick(techCards.content[0]);
                }
            })
    }, [handleTechCardClick, request, techCards.content]);

    const handleAddTechCard = useCallback(() => {
        setTechCards(prev => ({ ...prev, content: [...prev.content, DEFAULT_TECH_CARD] }))
        handleTechCardClick(DEFAULT_TECH_CARD);
        setMode("EDIT");
    }, [handleTechCardClick])

    const handleSendToManufacturing = useCallback((id: TechCardType["id"], quantity: number) => {
        startProcess(id, quantity)
            .then(() => alert("Успех!"))
            .catch((err: Error) => {
                if (err.message.includes("Unexpected end of JSON input")) alert("Успех!")
                else alert("Ошибка!")
            })
    }, [])

    const disableSendToManufacturing = useMemo(() => {
        
        if (!techCardInfo) return false;

        const { components } = techCardInfo;

        return components.some(c => c.id === null)

    }, [techCardInfo])

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
                            onClick={() => console.log("Поиск в разработке")}>
                            Поиск
                        </Button>
                    </div>
                </div>
                <div className={styles.techCardBoard}>
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
                        <Button view="raised" size="xl" onClick={handleAddTechCard}>
                            <Icon data={Plus} />
                            Добавить
                        </Button>
                    </div>
                    <Card className={styles.techCardInfo}>
                        {!techCardInfo && "Ничего не выбрано"}
                        {techCardInfo &&
                            <>

                                <div className={styles.techCardViewActions}>
                                    {mode === "INFO" ?
                                        <Button onClick={() => setMode("EDIT")}>Редактировать</Button> :
                                        <Button onClick={() => setMode("INFO")}>Отмена</Button>}
                                    <Button onClick={() => handleDeleteTechCard(techCardInfo)}>Удалить</Button>
                                </div>
                                <TechCardView
                                    techCard={techCardInfo}
                                    componentsList={components.content}
                                    onSave={handleSaveTechCard} 
                                    mode={mode} />
                                <Button
                                    view="raised"
                                    size="l"
                                    disabled={disableSendToManufacturing}
                                    onClick={() => handleSendToManufacturing(techCardInfo.id, 1)}
                                >
                                    Отправить в производство
                                </Button>
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