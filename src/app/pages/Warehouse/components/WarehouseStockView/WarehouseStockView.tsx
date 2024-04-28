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
            if (stock.type === WarehouseStockType.COMPONENT) return stock.component.category.name
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