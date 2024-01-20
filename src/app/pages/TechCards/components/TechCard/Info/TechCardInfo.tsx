import { Table } from "@gravity-ui/uikit";
import styles from './styles.module.css';
import { TechCard } from "@domain/TechCard";

interface Props {
    components: TechCard["components"];
}

export default function TechCardInfo({components}: Props) {

    return (
            <Table className={styles.techCardComponents}
                data={components}
                columns={[
                    { id: "name", name: "Наименование", template: (component) => component.component.name },
                    { id: "category", name: "Категория", template: (component) => component.component.category.name },
                    { id: "quantity", name: "Количество", template: (component) => component.quantity }
                ]}
            />
    )
}