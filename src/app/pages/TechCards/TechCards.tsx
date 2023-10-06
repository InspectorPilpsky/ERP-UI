import { useCallback, useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination'
import styles from './styles.module.css'
import { Component } from '../../../api/Components/domain/Component';
import { PAGEABLE_DEFAULT, PageableWrapper } from '../../../api/pageable';
import Drawer from '../../components/Drawer/Drawer';
import Button from '../../components/Button/Button';
import Search from '../../components/Search/Search';
import ComponentsTable from './components/ComponentsTable/ComponentsTable';
import { getTechCards } from '../../../api/TechCards/getTechCards';
import { TechCard } from '../../../api/TechCards/domain/TechCard';

const PAGE_SIZE = 5;

export default function TechCards() {

    const [techCards, setTechCards] = useState<PageableWrapper<TechCard[]>>(PAGEABLE_DEFAULT);

    const [techCardInfo, setTechCardInfo] = useState<TechCard | null>(null);

    const [page, setPage] = useState(0);

    const handleTechCardClick = useCallback((techCard: TechCard) => {
        setTechCardInfo(techCard);
    }, [])

    const handlePageChange = useCallback((page: number) => {setPage(page)}, []);

    const request = useCallback(() => {
        getTechCards(page, PAGE_SIZE)
            .then(res => setTechCards(res));
    }, [page])

    useEffect(() => request(), [request])

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.components}>
                <div className={styles.header}>
                    <div className={styles.headerTitle}>Технологические карты</div>
                    <div className={styles.headerFilters}>
                        <Search></Search>
                        <Button onClick={() => console.log("test")}>Поиск</Button>
                    </div>
                </div>
                
            </div>
            <div className={styles.pagination}>
                <Pagination pageable={techCards} onChange={handlePageChange} />
            </div>
        </div>
    )
}