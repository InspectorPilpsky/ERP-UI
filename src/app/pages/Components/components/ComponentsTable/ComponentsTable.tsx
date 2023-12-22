import { Component } from '../../../../../api/Components/domain/Component';
import styles from './styles.module.css'

interface Props {
    children: Component[];
    onClick: (component: Component) => void;
}
export default function ComponentsTable({children, onClick}: Props) {
    return (
        <table className={styles.componentsTable}>
            <thead>
                <tr>
                    <th>Наименование</th>
                    <th>Единицы измерения</th>
                    <th>Категория</th>
                    <th>Код</th>
                    <th>Наличие</th>
                </tr>
            </thead>
            <tbody>
                {children.map(child => {
                        const { id, name, unit, category, code, stock } = child;
                        const values = Object.values({
                            name,
                            unit,
                            category: category.name,
                            code,
                            stock
                        })
                        return <tr key={id} onClick={() => onClick(child)}>{values.map((v, key) => <td key={key}>{v}</td>)}</tr>
                    }
                    )
                }
            </tbody>
        </table>
    )
}