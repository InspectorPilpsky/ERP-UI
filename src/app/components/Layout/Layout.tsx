import { Outlet } from "react-router-dom";
import styles from './styles.module.css'
import Menu from "../Menu/Menu";
export default function Layout() {
    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                
            </header>
            <aside className={styles.menu}>
                <Menu />
            </aside>
            <section className={styles.content}>
                <Outlet />
            </section>
        </div>
    )
}