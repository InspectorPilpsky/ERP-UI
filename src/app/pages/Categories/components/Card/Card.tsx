import styles from './styles.module.css'
import folder_icon from '../../../../../assets/folder.png'

interface Props {
    children?: React.ReactNode;
    qty?: number;
    add?: boolean;
}

export default function Card({ children, qty, add }: Props) {
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <picture>
                    <img src={folder_icon} />
                </picture>
                {children}
                {add &&
                    <div className={styles.addCategory}>
                        <div className={styles.plus}>+</div>
                        <div>Добавить категорию</div>
                    </div>
                }
            </div>
            <div className={styles.qty}>{qty}</div>
        </div>
    )
}