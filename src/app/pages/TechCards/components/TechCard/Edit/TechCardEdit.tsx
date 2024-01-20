import { TechCard } from "@domain/TechCard";
import ComponentSelect from "./components/ComponentSelect/ComponentSelect";
import { Component } from "@domain/Component";
import { Button, TextInput } from "@gravity-ui/uikit";
import { useCallback, useState } from "react";

interface Props {
    componentsList: Component[];
    techCard: TechCard;
    onSave?: (techCard: TechCard) => void;
}

const DEFAULT_COMPONENT: Component = {
    id: null,
    name: '',
    unit: '',
    code: '',
    stock: 0,
    category: {
        id: null,
        name: '',
        quantity: 0
    }
}

export default function TechCardEdit({ componentsList, techCard, onSave }: Props) {

    const [techCardForm, setTechCardForm] = useState(techCard);

    const handleAddComponent = useCallback(() => {

        // eslint-disable-next-line
        // @ts-ignore
        setTechCardForm(prev => {

            console.log('handleAddComponent', prev);
            return ({ ...prev, components: [...prev.components, { id: null, quantity: 1, component: DEFAULT_COMPONENT }] })
        })
    }, [])

    const componentChangeHandler = useCallback((prevId: Component["id"], component: TechCard["components"][0]) => {

        const { components } = techCardForm;

        const index = components.findIndex(c => c.id === prevId);
        if (index >= 0) {
            const newComps = components.map((c, i) => {
                if (i === index) {
                    return (component)
                }
                return c;
            })
            setTechCardForm(prev => ({ ...prev, components: newComps }))
        }
    }, [techCardForm])

    return (
        <div>
            {/* <pre>{JSON.stringify(techCardForm, null, 2)}</pre> */}
            <TextInput
                size='xl'
                placeholder='Наименование'
                value={techCardForm ? techCardForm.name : undefined}
                onChange={(e) => setTechCardForm((prev) => ({ ...prev, name: e.target.value }))} />
            <TextInput
                size='xl'
                placeholder='Код'
                value={techCardForm ? techCardForm.code : undefined}
                onChange={(e) => setTechCardForm((prev) => ({ ...prev, code: e.target.value }))} />
            {techCardForm.components.map(c =>
                <ComponentSelect key={c.id}
                    componentList={componentsList}
                    selectedComponent={c}
                    onChange={componentChangeHandler}
                />)}
            <Button onClick={handleAddComponent}>Добавить компонент</Button>
            <Button onClick={() => onSave && onSave(techCardForm)}>Сохранить</Button>
        </div>
    )
}