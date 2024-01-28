import styles from './styles.module.css'
import { Button, Select, TextInput } from '@gravity-ui/uikit';
import { useCallback, useState } from 'react';
import Drawer from '@app/components/Drawer/Drawer';
import { DEFAULT_WAREHOUSE_SHIPMENT, WarehouseShipment, WarehouseShipmentAction } from '@domain/Warehouse/WarehouseShipment';
import { Component } from '@domain/Component';

interface Props {
    isVisible: boolean;
    components: Component[];
    componentsOpts: Array<{ value: string, content: string }>;
    onClose: () => void;
    onAdd?: (shipment: WarehouseShipment) => void;
}

export default function ShipmentAdd({ isVisible, components, componentsOpts, onClose, onAdd }: Props) {

    const [newShipment, setNewShipment] = useState<WarehouseShipment>(DEFAULT_WAREHOUSE_SHIPMENT);

    const setShipmentField = useCallback((field: keyof WarehouseShipment, value: WarehouseShipment[typeof field]) => {
        const tmp = { ...newShipment };
        // eslint-disable-next-line
        // @ts-ignore
        tmp[field] = value;
        setNewShipment(tmp);
    }, [newShipment])

    return (
        isVisible ?
            <Drawer
                title={"Добавить поставку/отгрузку"}
                width='600px'
                onClose={onClose}
            >
                <div className={styles.wrapper}>
                    <div className={styles.form}>
                        {/* <pre>{JSON.stringify(newShipment, null, 2)}</pre> */}
                        <Select
                            size='xl'
                            label='Операция'
                            placeholder="Операция"
                            value={[newShipment.action]}
                            options={Object
                                .entries(WarehouseShipmentAction)
                                .map(
                                    ([k, v]) => ({ value: k, content: v === "INCOME" ? "Поставка" : "Отгрузка" })
                                )
                            }
                            onUpdate={([action]) => {
                                setShipmentField("action", action);
                            }}
                        />
                        <TextInput
                            label='№ заказа'
                            size='xl'
                            placeholder='№ заказа'
                            value={newShipment.orderNumber}
                            onChange={(e) => setShipmentField("orderNumber", e.target.value)} />
                        <TextInput
                            label='Кол- во'
                            size='xl'
                            placeholder='Количество'
                            value={newShipment.amount.toString()}
                            onChange={(e) => setShipmentField("amount", Number(e.target.value.replace(/\D/g, '')))} />
                        <TextInput
                            label='Цена'
                            size='xl'
                            placeholder='Цена'
                            value={newShipment.cost.toString()}
                            onChange={(e) => setShipmentField("cost", Number(e.target.value.replace(/\D/g, '')))} />
                        <Select
                            size='xl'
                            label='Компонент'
                            placeholder="Компонент"
                            filterable
                            value={[newShipment.component.name]}
                            options={componentsOpts}
                            onUpdate={([component]) => {

                                const comp = components.find(c => c.id?.toString() === component);

                                if (comp) {
                                    setNewShipment(prev => {
                                        const cat = { ...comp.category }
                                        return ({
                                            ...prev,
                                            childId: Number(comp.id),
                                            component: { ...comp, category: { ...cat } }
                                        })
                                    })
                                }

                            }}
                        />
                    </div>
                    <div className={styles.actions}>
                        <Button view="action" size="xl" onClick={() => onAdd && onAdd(newShipment)}>Добавить</Button>
                        <Button view="outlined" size="xl">Отмена</Button>
                    </div>
                </div>
            </Drawer>
            : null
    )
}