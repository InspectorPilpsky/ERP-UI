import { useRef } from 'react'
import styles from './styles.module.css'
import { useClickOutside } from '@reactuses/core';

import noImage from '../../../assets/no_image.png'

interface Props {
    children: React.ReactNode;
    category: string;
    onClose: () => void;
}

export default function Drawer({ children, category, onClose }: Props) {

    const drawerRef = useRef<HTMLDivElement>(null);

    useClickOutside(drawerRef, onClose);

    return (
        <div className={styles.wrap}>
            <div className={styles.shade}></div>
            <div className={styles.drawer} ref={drawerRef}>
                <div className={styles.picture}>
                    <img src={noImage} alt="No image" />
                    <span>{category}</span>
                </div>
                <div className="body">{children}</div>
                <div className="actions"></div>
            </div>
        </div>
    )
}