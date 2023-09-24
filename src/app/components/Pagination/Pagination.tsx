import { Pageable } from '../../../api/pageable'
import styles from './styles.module.css'

interface Props {
    pageable?: Pageable
}

export default function Pagination({}: Props) {
    return (
        <div className={styles.wrap}>
            <div className={styles.arrow}>{"<"}</div>
            <div className={styles.pages}>
                <div className={styles.page}>1</div>
                <div className={styles.page}>2</div>
                <div className={styles.page}>3</div>
                <div className={styles.page}>...</div>
                <div className={styles.page}>9</div>
            </div>
            <div className={styles.arrow}>{">"}</div>
        </div>
    )
}