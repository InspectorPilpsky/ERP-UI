import styles from './styles.module.css'

import noImage from '../../../assets/no_image.png'

interface Props {
    children: React.ReactNode;
    title: string;
    width?: string;
    onClose: () => void;
}

export default function Drawer({ children, title, width = "400px", onClose }: Props) {

    return (
        <div className={styles.wrap}>
            <div className={styles.shade} onClick={onClose}></div>
            <div className={styles.drawer} style={{width: width}}>
                <div className={styles.picture}>
                    <img src={noImage} alt="No image" />
                    <span>{title}</span>
                </div>
                <div className={styles.body}>{children}</div>
                <div className="actions"></div>
            </div>
        </div>
    )
}