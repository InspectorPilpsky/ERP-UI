import styles from './styles.module.css'
import folder_icon from '../../../../../assets/folder.png'

interface Props {
    children: React.ReactNode;
    qty?: number;
}

export default function Card({ children, qty }: Props) {
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <picture>
                    <img src={folder_icon} />
                </picture>
                {children}
            </div>
            <div className={styles.qty}>{qty}</div>
        </div>
    )
}