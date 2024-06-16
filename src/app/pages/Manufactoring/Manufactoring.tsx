import { Button, Card, Modal, Table, TextInput, WithTableActionsProps, withTableActions } from '@gravity-ui/uikit'
import styles from './styles.module.css'
import { useCallback, useEffect, useState } from 'react';
import { checkStockForProcess, deleteProcess, getProcessInfo, getProcesses, registerIncomeForProcess } from '@api/Management';
import { ManufacturingProcess } from '@domain/Management/ManufacturingProcess';
import { Drawer, DrawerItem } from '@gravity-ui/navigation';
import ProcessInfo from './components/ProcessInfo/ProcessInfo';
import { Component } from '@domain/Component';
import AddProcessModal from './components/AddProcessModal/AddProcessModal';
import { TechCard } from '@domain/TechCard';
import { Boxing } from './types';
import { startPresaleProcess } from '@api/Management/startPresaleProcess';

type ProductIncome = {
    id: ManufacturingProcess["id"];
    stock: number;
}

export default function Manufactoring() {

    const [processes, setProcesses] = useState<ManufacturingProcess[]>([]);
    const [processInfo, setProcessInfo] = useState<Component[]>([])
    const [drawerIsVisible, setDrawerIsVisible] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [productIncome, setProductIncome] = useState<ProductIncome | undefined>();
    const [uploadingIncome, setUploadingIncome] = useState(false);

    const ProcessesTable = withTableActions<ManufacturingProcess>(Table);

    const request = useCallback(() => {
        getProcesses()
            .then(res => setProcesses(res));
    }, [])

    const processInfoRequest = (id: ManufacturingProcess["id"]) => {
        getProcessInfo(id)
            .then(res => setProcessInfo(res))
    }

    const handleRowClick = useCallback((item: ManufacturingProcess) => {
        processInfoRequest(item.id);
        setDrawerIsVisible(true);
    }, [])

    const handleShowCloseModal = useCallback((show: boolean, id?: ManufacturingProcess["id"]) => {
        if (show && id) {
            setModalIsOpen(true);
            setProductIncome({ id, stock: 0 });
        }
        else {
            setModalIsOpen(false);
            setProductIncome(undefined);
        }

    }, [])

    const handleRegisterIncome = useCallback(() => {
        if (productIncome) {
            const { id, stock } = productIncome;
            console.log('productIncome', productIncome);
            setUploadingIncome(true);
            registerIncomeForProcess(id, stock)
                .catch((err) => {
                    if (err.message.includes("Unexpected end of JSON input")) {
                        alert("Успех!")
                        handleShowCloseModal(false);
                    }
                    else alert("Ошибка!")
                })
                .finally(() => {request(); setUploadingIncome(false)});
        }


    }, [handleShowCloseModal, productIncome, request])

    const handleAddProduct = useCallback((name: string, techCard: TechCard, quantity: number, boxing: Boxing[]) => {
        console.log("name", name, "techCard", techCard, "quantity", quantity, "boxing", boxing)
        startPresaleProcess(name, techCard, quantity, boxing)
        .then((res) => {
            console.log(res);
            request();
        })
        .catch((err) => console.error("Ну пиздец", err))
    }, [request])

    const rowActions: WithTableActionsProps<ManufacturingProcess>["getRowActions"] = useCallback((item) => {
        const actionDelete =
        {
            text: "Удалить",
            theme: "danger",
            handler: (item: ManufacturingProcess) => {
                deleteProcess(item.id)
                    .finally(() => request());
            }
        }

        const actionCheckStock = {
            text: "Проверить наличие",
            handler: (item: ManufacturingProcess) => {
                checkStockForProcess(item)
                    .catch(() => {
                        alert("Успешно!");
                    })
                    .finally(() => request());
            }
        }


        const registerIncomeStock = {
            text: "Зарегистрировать изделия",
            handler: (item: ManufacturingProcess) => {
                handleShowCloseModal(true, item.id);
            }
        }

        const registerIncomeProduct = {
            text: "Зарегистрировать продукцию",
            handler: (item: ManufacturingProcess) => {
                handleShowCloseModal(true, item.id);
            }
        }

        const actions = [];

        if (item.stepName === "Проверить наличие составляющих на складе") {
            actions.push(actionCheckStock);
        }

        if (item.stepName === "Сформировать задачу на производство" || item.stepName === "Учесть готовую продукцию на складе") {
            actions.push(registerIncomeStock)
        }

        if (item.stepName === "Сформировать задачу на предпродажную упаковку") {
            actions.push(registerIncomeProduct)
        }

        actions.push(actionDelete);

        return (actions);

    }, [handleShowCloseModal, request])

    useEffect(() => request(), [request])

    return (
        <div className={styles.pageWrapper}>
            <AddProcessModal isOpen={addModalIsOpen} onClose={() => setAddModalIsOpen(false)}
                onAddItem={(item: TechCard, quantity: number) => { console.log(item, quantity) }}
                onAddProduct={handleAddProduct} />
            <Modal open={modalIsOpen && productIncome?.id !== undefined}
                onClose={() => handleShowCloseModal(false)}>
                <div className={styles.modal}>
                    <h3>Зарегистрировать входящую продукцию</h3>
                    <TextInput
                        label='Количество'
                        size='xl'
                        placeholder='Введите количество продукции'
                        value={productIncome?.stock.toString()}
                        onChange={(e) => {
                            const stock = Number(e.target.value.replace(/\D/g, ''));
                            if (productIncome?.id) setProductIncome({ ...productIncome, stock })
                        }} />
                    <div className={styles.modalActions}>
                        <Button view="action" loading={uploadingIncome} onClick={handleRegisterIncome}>Зарегистрировать</Button>
                        <Button onClick={() => handleShowCloseModal(false)}>Отмена</Button>
                    </div>
                </div>
            </Modal>
            <Drawer
                className={styles.drawer}
                onVeilClick={() => setDrawerIsVisible(false)}
                onEscape={() => setDrawerIsVisible(false)}
            >
                <DrawerItem
                    id={'processInfoDrawer'}
                    direction="right"
                    visible={drawerIsVisible}
                    content={<ProcessInfo components={processInfo} />}
                />
            </Drawer>
            <div className={styles.header}>
                <div className={styles.headerTitle}>
                    Производство
                </div>
                <Button size="l" view="action" onClick={() => setAddModalIsOpen(true)}>Добавить</Button>
            </div>
            <Card view="raised" className={styles.pageContent}>
                <ProcessesTable
                    className={styles.table}
                    data={processes}
                    columns={[
                        { id: "cardName", name: "Наименование технологической карты" },
                        { id: "id", name: "Артикул" },
                        { id: "cardCode", name: "Код" },
                        { id: "stepName", name: "Текущий этап производства" },
                        { id: "required", name: "Недостающие компоненты" },
                    ]}
                    onRowClick={handleRowClick}
                    getRowActions={rowActions}
                />
            </Card>
        </div>
    )
}