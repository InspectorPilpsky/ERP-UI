import styles from './styles.module.css'
import home_icon from '../../../assets/home.png'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'

export default function Menu() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <picture>
                    <img src={home_icon} />
                </picture>
                Меню
            </div>
            <div className="navigation">
                <NavLink to="/orders">
                    {({isActive}) => 
                        <MenuItem label="ЗАКАЗЫ" isActive={isActive} />}
                </NavLink>
                <NavLink to="/manufactoring">
                    {({isActive}) => 
                        <MenuItem label="ПРОИЗВОДСТВО" isActive={isActive} />}
                </NavLink>
                <NavLink to="/techcards">
                    {({isActive}) => 
                        <MenuItem label="ТЕХНОЛОГИЧЕСКИЕ КАРТЫ" isActive={isActive} />}
                </NavLink>
                <NavLink to="/components">
                    {({isActive}) => 
                        <MenuItem label="КОМПОНЕНТЫ" isActive={isActive} />}
                </NavLink>
                <NavLink to="/categories">
                    {({isActive}) => 
                        <MenuItem label="КАТЕГОРИИ" isActive={isActive} />}
                </NavLink>
            </div>
        </div>
    )
}

function MenuItem({label, isActive}: {label: string, isActive: boolean}) {
    return <div className={clsx(styles['navigation-item'],{[styles.active]: isActive})}>{label}</div>
}