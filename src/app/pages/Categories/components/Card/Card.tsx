import styles from './styles.module.css'
import { Card as GravityCard} from '@gravity-ui/uikit';
import { FolderOpen } from '@gravity-ui/icons';

interface Props {
    children: React.ReactNode;
    qty?: number;
}

export default function Card({ children, qty }: Props) {
    return (
        <GravityCard view="raised" className={styles.card}>
            <div className={styles.content}>
                <FolderOpen width="32px" height={"32px"} />
                <span>{children}</span>
            </div>
            <div className={styles.qty}>{qty}</div>
        </GravityCard>
    )
}