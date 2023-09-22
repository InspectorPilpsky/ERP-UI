import clsx from 'clsx'
import styles from './styles.module.css'
import { useState } from 'react';
import { Category } from '../../../../../api/Categories/domain/Category';

interface Props {
    category?: Category;
    onChange?: (value: string) => void;
    onAdd?: () => void;
}

export default function AddCategory({ category, onChange, onAdd }: Props) {

    const [isActive, setIsActive] = useState(false);

    return (
        <div className={clsx(styles.cardWrap, { [styles.active]: isActive })}>
            <div
                className={clsx(styles.card, styles.front)}
                onClick={() => setIsActive(true)}>
                <div className={styles.addCategory}>
                    <div className={styles.plus}>+</div>
                    <div>Добавить категорию</div>
                </div>
            </div>
            <div
                className={clsx(styles.card, styles.back)}
            >
                <div className={styles.input}>
                    <label htmlFor="categoryName">Наименование</label>
                    <input id="categoryName"
                        value={category?.name}
                        onChange={(e) => onChange && onChange(e.target.value)}
                    />
                </div>
                <div className={styles.actions}>
                    <button
                        onClick={() => {onAdd && onAdd(); setIsActive(false)}}
                    >Добавить</button>
                    <button
                        onClick={() => setIsActive(false)}>
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    )
}