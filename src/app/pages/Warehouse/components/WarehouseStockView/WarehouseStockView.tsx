import {
  WarehouseStock,
  WarehouseStockType,
} from "@domain/Warehouse/WarehouseStock";
import {
  Button,
  Modal,
  Select,
  Table,
  TextInput,
  WithTableActionsProps,
  withTableActions,
} from "@gravity-ui/uikit";
import { warehouseStockTypeMap } from "../../constants";
import { useCallback, useMemo, useState } from "react";
import styles from "./styles.module.css";
import { Customer } from "@domain/Customers";
import { Product } from "@domain/Product";
import { getCustomers } from "@api/Customers/getCustomers";
import { sendToCustomer } from "@api/Customers/sendToCustomer";

interface Props {
  stockData: WarehouseStock[];
}

type ProductToSend = {
  productId: Product["id"];
  productName: Product["name"];
  quantity: number;
  priceByPt: number;
  customer: { id: Customer["id"]; title: Customer["title"] };
};

const StockTable = withTableActions<WarehouseStock>(Table);

const stockTemplate = (
  stock: WarehouseStock,
  field: "name" | "code" | "category"
) => {
  switch (field) {
    case "name":
      if (stock.type === WarehouseStockType.COMPONENT)
        return stock.component.name;
      else if (stock.type === WarehouseStockType.CARD)
        return stock.techCard.name;
      else return stock.product.name;
    case "code":
      if (stock.type === WarehouseStockType.COMPONENT)
        return stock.component.code;
      else if (stock.type === WarehouseStockType.CARD)
        return stock.techCard.code;
      else return stock.product.code;
    case "category":
      if (stock.type === WarehouseStockType.COMPONENT)
        return stock.component.category?.name;
      else return null;
    default:
      return "";
  }
};

export default function WarehouseStockView({ stockData }: Props) {
  const [sendProductModalIsOpen, setSendProductModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [productToSend, setProductToSend] = useState<
    ProductToSend | undefined
  >();

  const customersRequest = useCallback(() => {
    getCustomers(0, 1000).then(({ content }) => setCustomers(content));
  }, []);

  const customersOpts: Array<{ value: string; content: string }> = useMemo(
    () =>
      customers.map((c) => ({
        value: c.id?.toString() || "-1",
        content: `${c.title} (${c.phone})`,
      })),
    [customers]
  );

  const handleSendToCustomer = useCallback(() => {
    setLoading(true);
    console.log("productToSend", productToSend);
    if (productToSend) {
      const {
        customer: { id },
        productId,
        quantity,
        priceByPt,
      } = productToSend;
      sendToCustomer(id, productId, quantity, priceByPt)
        .then(() => {
          alert("Успешно!");
          setSendProductModalIsOpen(false);
        })
        .catch((e) => {
          console.error(e);
          alert("Что- то пошло не так...");
        })
        .finally(() => setLoading(false));
    }
  }, [productToSend]);

  const rowActions: WithTableActionsProps<WarehouseStock>["getRowActions"] =
    useCallback(() => {
      const sendToCustomer = {
        text: "Отправить контрагенту",
        handler: (item: WarehouseStock) => {
          console.log("item", item);
          setProductToSend((prev) => {
            if (item.type === WarehouseStockType.PRODUCT) {
              const { product } = item;
              return {
                ...prev,
                productId: item.childId,
                productName: product.name,
              } as ProductToSend;
            }
          });
          customersRequest();
          setSendProductModalIsOpen(true);
        },
      };

      const actions = [];

      actions.push(sendToCustomer);

      return actions;
    }, [customersRequest]);

  return (
    <div>
      <pre>{JSON.stringify(productToSend, null, 2)}</pre>
      <Modal
        open={sendProductModalIsOpen}
        onClose={() => setSendProductModalIsOpen(false)}
      >
        <div className={styles.modal}>
          <h3>Отправить контрагенту</h3>
          <TextInput
            label="Количество"
            size="xl"
            placeholder="Введите количество продукции"
            value={
              productToSend?.quantity ? productToSend.quantity.toString() : ""
            }
            onChange={(e) => {
              const quantity = Number(e.target.value.replace(/\D/g, ""));
              if (productToSend?.productId)
                setProductToSend({ ...productToSend, quantity });
            }}
          />
          <TextInput
            label="Стоимость"
            size="xl"
            placeholder="Введите стоимость 1 ед."
            value={
              productToSend?.priceByPt ? productToSend.priceByPt.toString() : ""
            }
            onChange={(e) => {
              const priceByPt = Number(e.target.value.replace(/\D/g, ""));
              if (productToSend?.productId)
                setProductToSend({ ...productToSend, priceByPt });
            }}
          />
          <Select
            size="xl"
            placeholder="Контрагент"
            value={[
              productToSend?.customer?.id
                ? customersOpts.find(
                    (opt) =>
                      opt.value === productToSend?.customer.id?.toString()
                  )?.value || "Не выбран"
                : "Не выбран",
            ]}
            options={customersOpts}
            // onUpdate={([category]) => setFilters(prev => ({ ...prev, categoryId: Number(category) }))}
            onUpdate={([customer]) => {
              setProductToSend((prev) => {
                if (prev) {
                  const selected = customersOpts.find(
                    (opt) => customer === opt.value
                  );
                  if (selected)
                    return {
                      ...prev,
                      customer: {
                        id: Number(selected.value),
                        title: selected.content,
                      },
                    };
                }
              });
            }}
          />
          <div className={styles.modalActions}>
            <Button
              view="action"
              loading={loading}
              onClick={handleSendToCustomer}
            >
              Отправить
            </Button>
            <Button onClick={() => setSendProductModalIsOpen(false)}>
              Отмена
            </Button>
          </div>
        </div>
      </Modal>
      <StockTable
        data={stockData}
        columns={[
          {
            id: "name",
            name: "Наименование",
            template: (data) => stockTemplate(data, "name"),
          },
          {
            id: "code",
            name: "Код",
            template: (data) => stockTemplate(data, "code"),
          },
          {
            id: "type",
            name: "Вид",
            template: (data) => warehouseStockTypeMap[data.type],
          },
          {
            id: "category",
            name: "Категория",
            template: (data) => stockTemplate(data, "category"),
          },
          { id: "amount", name: "Кол- во" },
          { id: "cost", name: "Себестоимость" },
        ]}
        getRowActions={rowActions}
      />
    </div>
  );
}
