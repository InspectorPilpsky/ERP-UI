import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Select, TextInput } from "@gravity-ui/uikit";

import styles from "./styles.module.css"
import { getWarehouseStock } from "@api/index";
import { DEFAULT_WAREHOUSE_STOCK, WarehouseCardStock, WarehouseComponentStock, WarehouseStock, WarehouseStockType } from "@domain/Warehouse/WarehouseStock";
import { TechCard } from "@domain/TechCard";
import ComponentSelect from "@app/pages/TechCards/components/TechCard/Edit/components/ComponentSelect/ComponentSelect";
import { Boxing } from "@app/pages/Manufactoring/types";

interface Props {
    onAdd: (name: string, techCard: TechCard, quantity: number, boxing: Boxing[]) => void
}

export default function ProductForm({ onAdd }: Props) {

    const [items, setItems] = useState<WarehouseStock[]>([DEFAULT_WAREHOUSE_STOCK]);

    const [quantity, setQuantity] = useState(1);
    const [name, setName] = useState("");
    const [cardFromStock, setCardFromStock] = useState<WarehouseCardStock | undefined>();
    const [boxing, setBoxing] = useState<Boxing[]>([]);

    const request = useCallback(() => {
        getWarehouseStock("ALL")
            .then(res => setItems(res));
    }, [])

    useEffect(() => { request() }, [request])

    const itemsOptions = useMemo(() => {
        const cardsFromStock: WarehouseCardStock[] = items.filter(i => i.type === WarehouseStockType.CARD) as WarehouseCardStock[];

        const options = cardsFromStock.map((i: WarehouseCardStock) => ({ value: i.childId.toString() || "", content: `${i.techCard.name} (${i.amount})` }))

        return options
    }, [items]);

    const componentsOptions = useMemo(() => {
        const componentsStock: WarehouseComponentStock[] = items.filter(i => i.type === WarehouseStockType.COMPONENT) as WarehouseComponentStock[];

        const options = componentsStock.map((i: WarehouseComponentStock) => i.component)

        return options
    }, [items]);

    const quantityIsValid = useMemo(() => cardFromStock && quantity > cardFromStock?.amount ? "invalid" : undefined, [cardFromStock, quantity])


    const componentChangeHandler = useCallback((index: number, component: TechCard["components"][0]) => {

        setBoxing(boxing.map((b, i) => i === index ? component : b))

    }, [boxing])

    const handleAddBoxing = useCallback(() => { setBoxing((prev) => [...prev, { id: null, quantity: 1, component: null }]) }, [])

    return (
        <div className={styles.productFormWrapper}>
            <div className={styles.productSelectInput}>
                <TextInput
                    size='xl'
                    placeholder='Наименование'
                    pin="round-brick"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <TextInput
                    size='xl'
                    placeholder='Количество'
                    pin="brick-round"
                    type="number"
                    value={quantity.toString()}
                    validationState={quantityIsValid}
                    errorMessage={"Не хватает изделий на складе"}
                    errorPlacement="inside"
                    onChange={(e) => setQuantity(Number(e.target.value))} />
            </div>
            <Select
                placeholder="Изделие"
                filterable
                size="xl"
                pin="round-brick"
                value={cardFromStock ? [cardFromStock.techCard.name] : undefined}
                options={itemsOptions}
                onUpdate={([techCard]) => {
                    const tcFromList: WarehouseCardStock | undefined = items.find(tc => tc.childId?.toString() === techCard) as WarehouseCardStock;
                    if (tcFromList) {
                        setCardFromStock(tcFromList)
                    }
                }}
            />
            {boxing.map((c, i) =>
                <ComponentSelect key={i}
                    componentList={componentsOptions}
                    selectedComponent={c}
                    onChange={(component) => componentChangeHandler(i, component)}
                />)}
            <Button onClick={handleAddBoxing} disabled={false}>Добавить компонент</Button>
            <Button size="l"
                view="action"
                disabled={!cardFromStock || quantity < 1 || quantityIsValid === "invalid" || name === ""}
                onClick={() => cardFromStock && onAdd(name, {...cardFromStock.techCard, id: cardFromStock.childId}, quantity, boxing)}>
                Добавить в производство
            </Button>
        </div>
    )
}