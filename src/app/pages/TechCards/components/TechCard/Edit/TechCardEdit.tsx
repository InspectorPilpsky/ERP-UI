import { TechCard } from "@domain/TechCard";
import ComponentSelect from "./components/ComponentSelect/ComponentSelect";
import { Component } from "@domain/Component";
import { Button, TextInput } from "@gravity-ui/uikit";
import { useCallback, useMemo, useState } from "react";
import styles from './styles.module.css'

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
            return ({ ...prev, components: [...prev.components, { id: null, quantity: 1, component: DEFAULT_COMPONENT }] })
        })
    }, [])

    const componentChangeHandler = useCallback((index: number, component: TechCard["components"][0]) => {

        const { components } = techCardForm;

        components[index] = component;

        setTechCardForm(prev => ({ ...prev, components: [...components] }))

    }, [techCardForm])

    const newComponentAddBtnDisabled = useMemo(() => {
        const { components } = techCardForm;
        return components.length > 0 && components[components.length - 1].component.id === null
    }, [techCardForm])

    return (
        <div className={styles.editor}>
            <div className={styles.editorForm}>
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
            </div>
            <div className={styles.editorComponents}>
                {techCardForm.components.map((c, i) =>
                    <ComponentSelect key={i}
                        componentList={componentsList}
                        selectedComponent={c}
                        onChange={(component) => componentChangeHandler(i, component)}
                    />)}
            </div>
            <div className={styles.editorActions}>
                <Button onClick={handleAddComponent} disabled={newComponentAddBtnDisabled}>Добавить компонент</Button>
                <Button onClick={() => onSave && onSave(techCardForm)}>Сохранить</Button>
            </div>
        </div>
    )
}