import { Component } from "@domain/Component"
import { Table } from "@gravity-ui/uikit"

interface Props {
    components: Component[]
}

export default function ProcessInfo({ components }: Props) {

    return (
        <div>
            <div>Недостающие составляющие</div>
            <Table
                data={components}
                columns={[
                    { id: "name", name: "Наименование" },
                    { id: "code", name: "Код" },
                    { id: "category", name: "Категория", template: (data) => data.category?.name },
                    { id: "stock", name: "Не хватает", template: (data) => `${data.stock} ${data.unit}` },
                ]}
            />
        </div>
    )
}