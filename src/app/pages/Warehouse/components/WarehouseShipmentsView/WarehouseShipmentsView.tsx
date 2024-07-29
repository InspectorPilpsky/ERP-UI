import {
  WarehouseShipment,
  WarehouseShipmentAction,
  WarehouseShipmentType,
} from "@domain/Warehouse/WarehouseShipment";
import { Table } from "@gravity-ui/uikit";

interface Props {
  shipmentsData: WarehouseShipment[];
}

const warehouseShipmentTypeMap: Record<WarehouseShipmentType, string> = {
  [WarehouseShipmentType.CARD]: "Изделие",
  [WarehouseShipmentType.COMPONENT]: "Компонент",
  [WarehouseShipmentType.PRODUCT]: "Продукт",
};

const warehouseShipmentActionMap: Record<WarehouseShipmentAction, string> = {
  [WarehouseShipmentAction.INCOME]: "Поставка (Зачисление)",
  [WarehouseShipmentAction.OUTCOME]: "Отгрузка (Списание)",
};

export default function WarehouseShipmentsView({ shipmentsData }: Props) {
  return (
    <Table
      data={shipmentsData}
      columns={[
        {
          id: "operation",
          name: "Операция",
          template: (data) => warehouseShipmentActionMap[data.action],
        },
        { id: "orderNumber", name: "№ заказа" },
        { id: "code", name: "Код", template: (data) => data.component.code },
        {
          id: "name",
          name: "Наименование",
          template: (data) => data.component.name,
        },
        {
          id: "type",
          name: "Вид",
          template: (data) => warehouseShipmentTypeMap[data.type],
        },
        {
          id: "category",
          name: "Категория",
          template: (data) => data.component.category?.name,
        },
        { id: "amount", name: "Кол- во" },
        { id: "cost", name: "Цена" },
        { id: "inDateTime", name: "Дата операции" },
      ]}
    />
  );
}
