import styles from './styles.module.css'
import { Button, Card as GravityCard } from '@gravity-ui/uikit';
import { FolderOpen, TrashBin } from '@gravity-ui/icons';
import clsx from 'clsx';
import { useState } from 'react';

interface Props {
    children: React.ReactNode;
    qty?: number;
    onDelete?: () => void
}

export default function Card({ children, qty, onDelete }: Props) {

    const [isActive, setIsActive] = useState(false);

    return (
        <GravityCard view="raised">
            <div className={clsx(styles.cardWrap, { [styles.active]: isActive })}>
                <div className={clsx(styles.content, styles.front)}>
                    <div className={styles.removeBtn}>
                        <TrashBin onClick={() => setIsActive(true)} />
                    </div>
                    <div className={styles.title}>
                        <FolderOpen width="32px" height={"32px"} />
                        <span>{children}</span>
                    </div>
                    <div className={styles.qty}>{qty}</div>
                </div>
                <div className={clsx(styles.content, styles.back)}>
                    <div className={styles.removeConfirmation}>
                        <div>
                            Вы действительно хотите удалить категорию?
                        </div>
                        <div className={styles.removeActions}>
                            <Button view="action" onClick={() => onDelete && onDelete()}>Удалить</Button>
                            <Button onClick={() => setIsActive(false)}>Отмена</Button>
                        </div>
                    </div>
                </div>
            </div>
        </GravityCard>
    )
}