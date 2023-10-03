import styles from './styles.module.css'

export default function Drawer() {
    return (
        <div className={styles.wrap}>
            <div className={styles.shade}></div>
            <div className={styles.drawer}>
                <div className={styles.picture}>
                        <img src="IamERP.png" alt="" />
                        <span>Я компонент</span>
                </div>
                <div className="body"></div>
                <div className="actions"></div>
            </div>
        </div>
    )
}