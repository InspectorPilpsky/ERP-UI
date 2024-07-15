import { getCustomers } from "@api/Customers/getCustomers";
import { PAGEABLE_DEFAULT, PageableWrapper } from "@api/pageable";
import { Customer } from "@domain/Customers";
import { Button, Icon, Table } from "@gravity-ui/uikit";
import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Plus } from "@gravity-ui/icons";
import { addCustomer } from "@api/Customers/addCustomer";
import CustomerInfoDrawer from "@app/pages/Customers/components/CustomerInfoDrawer/CustomerInfoDrawer";
import CustomerAddDrawer from "@app/pages/Customers/components/CustomerAddDrawer/CustomerAddDrawer";

export default function Customers() {
  const [customers, setCustomers] =
    useState<PageableWrapper<Customer[]>>(PAGEABLE_DEFAULT);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const [addDrawerIsVisible, setAddDrawerIsVisible] = useState(false);
  const [infoDrawerIsVisible, setInfoDrawerIsVisible] = useState(false);

  const addNewCustomer = useCallback((customer: Customer) => {
    console.log("addNewCustomer", customer);
    addCustomer(customer)
      .then(() => alert("Контрагент успешно добавлен!"))
      .then(() => getCustomers(0, 20).then(setCustomers))
      .catch((e) => {
        console.error(e);
        alert("Что- то пошло не так...");
      });
  }, []);

  useEffect(() => {
    getCustomers(0, 20).then(setCustomers);
  }, []);

  return (
    <div>
      <CustomerAddDrawer
        isVisible={addDrawerIsVisible}
        onAdd={addNewCustomer}
        onClose={() => setAddDrawerIsVisible(false)}
      />
      {selectedCustomer && (
        <CustomerInfoDrawer
          customer={selectedCustomer}
          isVisible={infoDrawerIsVisible}
          onClose={() => setInfoDrawerIsVisible(false)}
        />
      )}
      <Button
        size="l"
        view="action"
        onClick={() => setAddDrawerIsVisible(true)}
      >
        <Icon data={Plus} />
        Добавить
      </Button>
      <Table
        className={styles.customersTable}
        data={customers?.content || []}
        onRowClick={(customer) => {
          setSelectedCustomer(customer);
          setInfoDrawerIsVisible(true);
        }}
        columns={[
          { id: "title", name: "Наименование" },
          {
            id: "person",
            name: "Контактное лицо",
            template: ({ name, lastName }) => `${lastName} ${name}`,
          },
          { id: "phone", name: "Телефон" },
          { id: "balance", name: "Баланс" },
        ]}
      />
    </div>
  );
}
