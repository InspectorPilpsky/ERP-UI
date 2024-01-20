import { Button, Table } from "@gravity-ui/uikit";
import { TechCard } from "@domain";
import styles from './styles.module.css';

interface Props {
    components: TechCard["components"];
}

export default function TechCardInfo({components}: Props) {

    return (
        <>
            <Table className={styles.techCardComponents}
                data={components}
                columns={[
                    { id: "name", name: "Наименование", template: (component) => component.component.name },
                    { id: "category", name: "Категория", template: (component) => component.component.category.name },
                    { id: "quantity", name: "Количество", template: (component) => component.quantity }
                ]}
            />
            <div>
                <Button view="raised" size="l">Отправить в производство</Button>
            </div>
        </>
    )
}