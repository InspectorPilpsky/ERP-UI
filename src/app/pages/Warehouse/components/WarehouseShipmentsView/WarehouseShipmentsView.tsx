import { WarehouseShipment, WarehouseShipmentAction } from "@domain/Warehouse/WarehouseShipment";
import { Table } from "@gravity-ui/uikit";

interface Props {
    shipmentsData: WarehouseShipment[]
}

const warehouseShipmentActionMap: Record<WarehouseShipmentAction, string> = {
    [WarehouseShipmentAction.INCOME]: "Поставка (Зачисление)",
    [WarehouseShipmentAction.OUTCOME]: "Отгрузка (Списание)"
}

export default function WarehouseShipmentsView({ shipmentsData }: Props) {
    return (
            <Table
                data={shipmentsData}
                columns={[
                    { id: "operation", name: "Операция", template: (data) => warehouseShipmentActionMap[data.action] },
                    { id: "orderNumber", name: "№ заказа" },
                    { id: "name", name: "Наименование", template: (data) => data.component.name },
                    { id: "code", name: "Код", template: (data) => data.component.code },
                    { id: "type", name: "Вид" },
                    { id: "category", name: "Категория", template: (data) => data.component.category.name },
                    { id: "amount", name: "Кол- во" },
                    { id: "cost", name: "Цена" },
                    { id: "inDateTime", name: "Дата операции" },
                ]}
            />
    )
}