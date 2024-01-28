import { useCallback, useEffect, useMemo, useState } from "react";
import styles from './styles.module.css'
import { Button, Card, Icon, Tabs } from "@gravity-ui/uikit";
import { PAGEABLE_DEFAULT, PageableWrapper } from "@api/pageable";
import { WarehouseShipment } from "@domain/Warehouse/WarehouseShipment";
import { addWarehouseShipment, getWarehouseShipments, getWarehouseStock } from "@api/Warehouse";
import { WarehouseStock } from "@domain/Warehouse/WarehouseStock";
import WarehouseStockView from "./components/WarehouseStockView/WarehouseStockView";
import WarehouseShipmentsView from "./components/WarehouseShipmentsView/WarehouseShipmentsView";
import { Plus } from "@gravity-ui/icons";
import ShipmentAdd from "./components/ShipmentAdd/ShipmentAdd";
import { Component, DEFAULT_COMPONENT } from "@domain/Component";
import { getComponents } from "@api/Components";
// import { getProcesses } from "../../../api/Management/test;

export default function Warehouse() {

    const [tab, setTab] = useState("stock");
    const [warehouseShipments, setWarehouseShipments] = useState<PageableWrapper<WarehouseShipment[]>>(PAGEABLE_DEFAULT);
    const [warehouseStock, setWarehouseStock] = useState<PageableWrapper<WarehouseStock[]>>(PAGEABLE_DEFAULT);
    const [shipmentAdderIsVisible, setShipmentAdderIsVisible] = useState(false);

    const [components, setComponents] = useState<Component[]>([DEFAULT_COMPONENT]);

    const componentsOpts: Array<{ value: string, content: string }> = useMemo(() =>
        components.map(
            (c) => ({ value: c.id?.toString() || "-1", content: `${c.name} (${c.code}) [${c.category.name}]` }))
        , [components])


    const warehouseShipmentsRequest = useCallback(() => {
        getWarehouseShipments(0, 10)
            .then(setWarehouseShipments);
    }, [])

    const warehouseStockRequest = useCallback(() => {
        getWarehouseStock()
            .then(setWarehouseStock)
    }, [])

    const handleAddShipment = useCallback(() => {
        setShipmentAdderIsVisible(true);
    }, [])

    const handleAddShipmentSubmit = useCallback((shipment: WarehouseShipment) => {
        console.log('handleAddShipmentSubmit', shipment);
        addWarehouseShipment(shipment)
            .then(() => {
                warehouseShipmentsRequest();
                setShipmentAdderIsVisible(false);

            })
            .catch(() => {
                warehouseShipmentsRequest();
                setShipmentAdderIsVisible(false);

            })
            .finally(() => {
                warehouseShipmentsRequest();
                setShipmentAdderIsVisible(false);
            })
    }, [warehouseShipmentsRequest])

    useEffect(() => {
        getComponents(0, 1000, {
            code: null,
            categoryId: null
        })
            .then(res => setComponents(res.content))
    }, [])

    // const request2 = useCallback(() => {
    //     getProcesses()
    //         .then(res => console.log(res));
    // }, [])

    useEffect(() => warehouseShipmentsRequest(), [warehouseShipmentsRequest])
    useEffect(() => warehouseStockRequest(), [warehouseStockRequest])

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.pageHeader}>Склад</div>
            <Card view="raised" className={styles.warehouseContent}>
                <Tabs
                    activeTab={tab}
                    onSelectTab={setTab}
                    items={[
                        { id: 'stock', title: 'Наличие' },
                        { id: 'shipments', title: 'Поставки/отгрузки' },
                    ]}
                />
                {
                    tab === "shipments" ?
                        <>
                            {/* <WarehouseShipmentForm /> */}
                            <Button view="raised" size="xl" onClick={handleAddShipment} style={{width: "fit-content"}}>
                                <Icon data={Plus} />
                                Добавить
                            </Button>
                            <ShipmentAdd
                                isVisible={shipmentAdderIsVisible}
                                onAdd={handleAddShipmentSubmit}
                                onClose={() => {
                                    setShipmentAdderIsVisible(false);
                                }}
                                components={components}
                                componentsOpts={componentsOpts}
                            />
                            <WarehouseShipmentsView shipmentsData={warehouseShipments.content} />
                        </>
                        :
                        <WarehouseStockView stockData={warehouseStock.content} />
                }
            </Card>
        </div>
    )
}