import { TechCard } from '../../../../../api/TechCards/domain/TechCard';
import styles from './styles.module.css'

interface Props {
    children: TechCard[];
    onClick: (component: TechCard) => void;
}
export default function TechCardsTable({children, onClick}: Props) {
    return (
        <table className={styles.techCardsTable}>
            <thead>
                <tr>
                    <th>Наименование</th>
                    <th>Артикул</th>
                    <th>Код</th>
                </tr>
            </thead>
            <tbody>
                {children.map(child => {
                        const { id, name, code} = child;
                        const values = Object.values({
                            name,
                            id,
                            code
                        })
                        return <tr key={id} onClick={() => onClick(child)}>{values.map((v, key) => <td key={key}>{v}</td>)}</tr>
                    }
                    )
                }
            </tbody>
        </table>
    )
}