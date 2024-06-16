import { Component } from "@domain/Component";
import { TechCard, TechCardWithUndefComponent } from "@domain/TechCard";
import { Select, TextInput } from "@gravity-ui/uikit";
import { useMemo, useState } from "react";
import styles from './styles.module.css'

interface Props {
    componentList: Component[];
    selectedComponent?: TechCard["components"][0] | TechCardWithUndefComponent["components"][0];
    onChange?: (changedComponent: TechCard["components"][0]) => void;
}

export default function ComponentSelect({ componentList, selectedComponent, onChange }: Props) {

    const [component, setComponent] = useState(selectedComponent);

    const componentOptions = useMemo(() => componentList
        .map((c) => ({ value: c.id?.toString() || "", content: c.name }))
        , [componentList]);

    return (
        <div className={styles.componentSelect}>
            <Select
                placeholder="Компонент"
                filterable
                size="xl"
                pin="round-brick"
                value={component?.component ? [component?.component?.name] : undefined}
                options={componentOptions}
                onUpdate={([component]) => {
                    const compFromList = componentList.find(c => c.id?.toString() === component)
                    if (compFromList) {
                        // eslint-disable-next-line
                        // @ts-ignore
                        setComponent((prev) => {
                            const newComp = { ...prev, component: compFromList };
                            // eslint-disable-next-line
                            // @ts-ignore
                            if (onChange) onChange(newComp);
                            return (newComp)
                        })
                    }
                    // const cat = categories.find(c => c.id?.toString() === category);
                    // if (cat) setComponentField("category", cat)
                }}
            />
            <TextInput
                size='xl'
                placeholder='Количество'
                pin="brick-round"
                type="number"
                value={component ? component.quantity.toString() : undefined}
                onChange={(e) =>
                    // eslint-disable-next-line
                    // @ts-ignore
                    setComponent((prev) => {
                        const newComp = { ...prev, quantity: e.target.value };
                        // eslint-disable-next-line
                        // @ts-ignore
                        if (onChange) onChange(newComp);
                        return (newComp);
                    })
                } />
        </div>
    )
}