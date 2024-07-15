import styles from "./styles.module.css";
import Drawer from "../../../../components/Drawer/Drawer";
import { Button, TextInput } from "@gravity-ui/uikit";
import { useCallback, useState } from "react";
import { Customer, DEFAULT_CUSTOMER } from "@domain/Customers";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onAdd?: (component: Customer) => void;
}

export default function CustomerAddDrawer({
  isVisible,
  onClose,
  onAdd,
}: Props) {
  const [newCustomer, setNewCustomer] = useState<Customer>(DEFAULT_CUSTOMER);

  const setCustomerField = useCallback(
    (field: keyof Customer, value: Customer[typeof field]) => {
      const tmp = { ...newCustomer };
      // eslint-disable-next-line
      // @ts-ignore
      tmp[field] = value;
      setNewCustomer(tmp);
    },
    [newCustomer]
  );

  return isVisible ? (
    <Drawer title={"Добавить контрагента"} onClose={onClose}>
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <TextInput
            label="Наименование"
            size="xl"
            placeholder="Введите наименование контрагента"
            value={newCustomer?.title}
            onChange={(e) => setCustomerField("title", e.target.value)}
          />
          <TextInput
            label="Фамилия"
            size="xl"
            placeholder="Введите фамилию контактного лица"
            value={newCustomer?.lastName}
            onChange={(e) => setCustomerField("lastName", e.target.value)}
          />
          <TextInput
            label="Имя"
            size="xl"
            placeholder="Введите имя контактного лица"
            value={newCustomer?.name}
            onChange={(e) => setCustomerField("name", e.target.value)}
          />
          <TextInput
            label="Телефон"
            size="xl"
            placeholder="Введите телефон контактного лица"
            value={newCustomer?.phone}
            onChange={(e) => setCustomerField("phone", e.target.value)}
          />
        </div>
        <div className={styles.actions}>
          <Button
            view="action"
            size="xl"
            onClick={() => onAdd && onAdd(newCustomer)}
          >
            Добавить
          </Button>
          <Button view="outlined" size="xl">
            Отмена
          </Button>
        </div>
      </div>
    </Drawer>
  ) : null;
}
