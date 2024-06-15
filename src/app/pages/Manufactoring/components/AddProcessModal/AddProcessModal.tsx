import { ReactNode, useState } from "react";
import { Modal, Tabs } from "@gravity-ui/uikit";

import styles from "./styles.module.css"
import CardForm from "./components/CardForm/CardForm";
import ProductForm from "./components/ProductForm/ProductForm";
import { TechCard } from "@domain/TechCard";
import { Boxing } from "../../types";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onAddItem: (item: TechCard, quantity: number) => void;
    onAddProduct: (name: string, techCard: TechCard, quantity: number, boxing: Boxing[]) => void
}

enum Processes {
    CARD = "CARD",
    PRODUCT = "PRODUCT"
}

export default function AddProcessModal({ isOpen = false, onClose, onAddItem, onAddProduct }: Props) {

    const [tab, setTab] = useState<Processes>(Processes.CARD)



    const tabToFormMap: Record<Processes, ReactNode> = {
        [Processes.CARD]: <CardForm onAdd={onAddItem} />,
        [Processes.PRODUCT]: <ProductForm onAdd={onAddProduct} />
    }

    return (
        <Modal open={isOpen}
            onClose={onClose}>
            <div className={styles.modal}>
                <h3>Добавить</h3>
                <Tabs
                    activeTab={tab}
                    
                        // eslint-disable-next-line
                        // @ts-ignore
                    onSelectTab={setTab}
                    items={[
                        { id: Processes.CARD, title: 'Изделие' },
                        { id: Processes.PRODUCT, title: 'Продукт' },
                    ]}
                />
                {tabToFormMap[tab]}
            </div>
        </Modal>
    )
}