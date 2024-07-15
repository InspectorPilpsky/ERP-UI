import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { Customer } from "@domain/Customers";
import { DeliveryDTO } from "@api/Delivery/dto/Delivery.dto";
import { getDeliveries } from "@api/Delivery/dto/getDeliveries";
import Drawer from "@app/components/Drawer/Drawer";
import { Button, Table, TextInput } from "@gravity-ui/uikit";
import { PaymentDTO } from "@api/Payments/dto/Payment.dto";
import { getPayments } from "@api/Payments/getPayments";
import { postPayment } from "@api/Payments/postPayment";

interface Props {
  isVisible: boolean;
  customer: Customer;
  onClose: () => void;
  onAdd?: (component: Customer) => void;
}

export default function CustomerInfoDrawer({
  isVisible,
  customer,
  onClose,
}: Props) {
  const [customerDeliveries, setCustomerDeliveries] = useState<DeliveryDTO[]>(
    []
  );
  const [customerTransactions, setCustomerTransactions] = useState<
    PaymentDTO[]
  >([]);

  const [money, setMoney] = useState<number | undefined>();

  useEffect(() => {
    getDeliveries(customer.id, 0, 1000).then((res) =>
      setCustomerDeliveries(res.content)
    );
  }, [customer.id]);

  useEffect(() => {
    getPayments(customer.id, 0, 1000).then((res) =>
      setCustomerTransactions(res.content)
    );
  }, [customer.id]);

  return isVisible ? (
    <Drawer title={"Контрагент"} onClose={onClose} width="700px">
      <div className={styles.wrapper}>
        <div>
          <table>
            <tr>
              <td>Наименование</td>
              <td>{customer.title}</td>
            </tr>
            <tr>
              <td>Фамилия</td>
              <td>{customer.lastName}</td>
            </tr>
            <tr>
              <td>Имя</td>
              <td>{customer.name}</td>
            </tr>
            <tr>
              <td>Телефон</td>
              <td>{customer.phone}</td>
            </tr>
            <tr>
              <td>Баланс</td>
              <td>{customer.balance}</td>
            </tr>
          </table>
        </div>
        <br />
        <div className={styles.tables}>
          <h3>Отправления</h3>
          <Table
            data={customerDeliveries || []}
            columns={[
              { id: "direction", name: "Направление" },
              { id: "unitType", name: "Тип" },
              { id: "productName", name: "Наименование" },
              { id: "qty", name: "Количество" },
              { id: "price", name: "Стоимость" },
              { id: "deliveryTime", name: "Дата и время" },
            ]}
          />
          <br />
          <h3>Проводки</h3>
          <Table
            data={customerTransactions || []}
            columns={[
              { id: "direction", name: "Направление" },
              { id: "orderNumber", name: "Тип" },
              { id: "amount", name: "Количество" },
              { id: "price", name: "Стоимость" },
            ]}
          />
        </div>
        <div>
          <TextInput
            label="Деньги"
            size="xl"
            placeholder="Напиши сюда сколько тебе отбашляли"
            value={money ? money.toString() : ""}
            onChange={(e) => {
              const money = Number(e.target.value.replace(/\D/g, ""));
              setMoney(money);
            }}
          />
          <Button
            onClick={() => {
              postPayment({
                id: undefined,
                customerId: customer.id ?? 0,
                orderNumber: "",
                amount: money ?? 0,
                direction: "ARRIVING",
                deliveryTime: undefined,
              });
            }}
          >
            Засчитать
          </Button>
        </div>
      </div>
    </Drawer>
  ) : null;
}
