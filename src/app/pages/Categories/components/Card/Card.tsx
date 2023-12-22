import styles from './styles.module.css'
import folder_icon from '../../../../../assets/folder.png'
import { Card as GravityCard} from '@gravity-ui/uikit';

interface Props {
    children: React.ReactNode;
    qty?: number;
}

export default function Card({ children, qty }: Props) {
    return (
        <GravityCard view="raised" className={styles.card}>
            <div className={styles.content}>
                <picture>
                    <img src={folder_icon} />
                </picture>
                {children}
            </div>
            <div className={styles.qty}>{qty}</div>
        </GravityCard>
    )
}