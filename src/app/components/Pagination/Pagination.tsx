import { useEffect, useState } from 'react';
import { Pageable } from '../../../api/pageable'
import styles from './styles.module.css'
import clsx from 'clsx';

interface Props {
    pageable: Pageable;
    onChange: (page: number) => void;
}

export default function Pagination({ pageable: { number, totalPages }, onChange }: Props) {

    const [pages, setPages] = useState<string[]>([]);

    useEffect(() => {
        const newPages = [];

        const initial = number - 1 >= 1 ? number : 1;

        const end = initial + 2 < totalPages ? initial + 2 : totalPages;

        for (let p = initial; p <= end; p++) {
            newPages.push(String(p));
        }
        setPages(newPages);
    }, [number, totalPages]);

    const handlePageChange = (page: string) => {
        if (page !== "...") {
            onChange(Number(page) - 1);
        }
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.arrow} onClick={() => handlePageChange(String(number))}>{"<"}</div>
            <div className={styles.pages}>
                {pages.map(p =>
                    <div className={clsx(styles.page, { [styles.active]: Number(p) === number + 1 })} onClick={() => handlePageChange(p)}>{p}</div>
                )}
            </div>
            <div className={styles.arrow} onClick={() => handlePageChange(String(number + 2))}>{">"}</div>
        </div>
    )
}