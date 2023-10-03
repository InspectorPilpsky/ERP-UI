import { Outlet } from "react-router-dom";
import styles from './styles.module.css'
import Menu from "../Menu/Menu";
export default function Layout() {
    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                
            </header>
            <section className={styles.content}>
                <Outlet />
            </section>
            <aside className={styles.menu}>
                <Menu />
            </aside>
        </div>
    )
}