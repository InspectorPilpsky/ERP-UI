import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Select, TextInput } from "@gravity-ui/uikit";

import { PageableWrapper, PAGEABLE_DEFAULT } from "@api/pageable";
import { getTechCards } from "@api/TechCards";
import { TechCard as TechCardType } from '@domain/TechCard';
import styles from "./styles.module.css"

interface Props {
    onAdd: (
        techCard: TechCardType,
        quantity: number) => void
}

export default function CardForm({ onAdd }: Props) {

    const [techCard, setTechCard] = useState<TechCardType | undefined>()
    const [quantity, setQuantity] = useState(1);

    const [techCards, setTechCards] = useState<PageableWrapper<TechCardType[]>>(PAGEABLE_DEFAULT);

    const request = useCallback(() => {
        getTechCards(0, 100)
            .then(res => setTechCards(res));
    }, [])

    useEffect(() => { request() }, [request])

    const techCardsOptions = useMemo(() => techCards.content.map(tc => ({ value: tc.id?.toString() || "", content: `${tc.name} (${tc.code})` })), [techCards.content])

    return (
        <div className={styles.techCardFormWrapper}>
            <div className={styles.techCardSelectInput}>
                <Select
                    placeholder="Изделие"
                    filterable
                    size="xl"
                    pin="round-brick"
                    value={techCard ? [techCard.name] : undefined}
                    options={techCardsOptions}
                    onUpdate={([techCard]) => {
                        const tcFromList = techCards.content.find(tc => tc.id?.toString() === techCard)
                        if (tcFromList) {
                            setTechCard(tcFromList)
                        }
                    }}
                />
                <TextInput
                    size='xl'
                    placeholder='Количество'
                    pin="brick-round"
                    type="number"
                    value={quantity.toString()}
                    onChange={(e) => setQuantity(Number(e.target.value))} />
            </div>
            <Button size="l" view="action" disabled={!techCard || quantity < 1} onClick={() => techCard && onAdd(techCard, quantity)}>Добавить в производство</Button>
        </div>
    )
}