import { Card, Table, WithTableActionsProps, withTableActions } from '@gravity-ui/uikit'
import styles from './styles.module.css'
import { useCallback, useEffect, useState } from 'react';
import { deleteProcess, getProcessInfo, getProcesses } from '@api/Management';
import { ManufacturingProcess } from '@domain/Management/ManufacturingProcess';
import { Drawer, DrawerItem } from '@gravity-ui/navigation';
import ProcessInfo from './components/ProcessInfo/ProcessInfo';
import { Component } from '@domain/Component';

export default function Manufactoring() {

    const [processes, setProcesses] = useState<ManufacturingProcess[]>([]);
    const [processInfo, setProcessInfo] = useState<Component[]>([])
    const [drawerIsVisible, setDrawerIsVisible] = useState(false);

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

    const rowActions: WithTableActionsProps<ManufacturingProcess>["getRowActions"] = useCallback(() => ([
        {
            text: "Удалить",
            handler: (item) => {
                deleteProcess(item.id)
                    .finally(() => request());
            }
        }
    ]), [])

    useEffect(() => request(), [request])

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.header}>
                <div className={styles.headerTitle}>
                    Производство
                </div>
            </div>
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