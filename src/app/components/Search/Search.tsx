import styles from './styles.module.css'

export default function Search() {
    return (
        <div className={styles.search}>
            <i className="fa-solid fa-magnifying-glass fa-2xl"></i>
            <input type='text' placeholder='Найти' />
        </div>
    )
}