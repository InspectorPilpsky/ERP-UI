import { WarehouseStock, WarehouseStockType } from "@domain/Warehouse/WarehouseStock";
import { Table } from "@gravity-ui/uikit";

interface Props {
    stockData: WarehouseStock[]
}
const stockTemplate = (stock: WarehouseStock, field: "name" | "code" | "category") => {
    switch (field) {
        case "name":
            if (stock.type === WarehouseStockType.COMPONENT) return stock.component.name
            else return stock.techCard.name
        case "code":
            if (stock.type === WarehouseStockType.COMPONENT) return stock.component.code
            else return stock.techCard.code
        case "category":
            if (stock.type === WarehouseStockType.COMPONENT) return stock.component.category?.name
            else return null;
        default:
            return ""
    }
}

export default function WarehouseStockView({ stockData }: Props) {
    return (
        <Table
            data={stockData}
            columns={[
                {id: "name", name: "Наименование", template: (data) => stockTemplate(data, "name")},
                {id: "code", name: "Код", template: (data) => stockTemplate(data, "code")},
                {id: "type", name: "Вид"},
                {id: "category", name: "Категория", template: (data) => stockTemplate(data, "category")},
                {id: "amount", name: "Кол- во"},
                {id: "cost", name: "Себестоимость"},
            ]}

        />
    )
}