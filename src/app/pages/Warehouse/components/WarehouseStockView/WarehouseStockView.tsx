import { WarehouseStock } from "@domain/Warehouse/WarehouseStock";
import { Table } from "@gravity-ui/uikit";

interface Props {
    stockData: WarehouseStock[]
}

export default function WarehouseStockView({stockData}: Props) {

    return (
        <Table
            data={stockData}
            columns={[
                {id: "name", name: "Наименование", template: (data) => data.component.name},
                {id: "code", name: "Код", template: (data) => data.component.code},
                {id: "type", name: "Вид"},
                {id: "category", name: "Категория", template: (data) => data.component.category?.name},
                {id: "amount", name: "Кол- во"},
                {id: "cost", name: "Себестоимость"},
            ]}

        />
    )
}