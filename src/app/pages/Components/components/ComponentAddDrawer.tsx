import styles from './styles.module.css'
import Drawer from '../../../components/Drawer/Drawer';
import { Button, Select, TextInput } from '@gravity-ui/uikit';
import { useCallback, useState } from 'react';
import { Component, DEFAULT_COMPONENT } from '@domain/Component';
import { Category } from '@domain/Category';

interface Props {
    isVisible: boolean;
    categories: Category[];
    categoriesOpts: Array<{ value: string, content: string }>;
    onClose: () => void;
    onAdd?: (component: Component) => void;
}

export default function ComponentAddDrawer({ isVisible, categories, categoriesOpts, onClose, onAdd }: Props) {

    const [newComponent, setNewComponent] = useState<Component>(DEFAULT_COMPONENT)

    const setComponentField = useCallback((field: keyof Component, value: Component[typeof field]) => {
        const tmp = { ...newComponent };
        // eslint-disable-next-line
        // @ts-ignore
        tmp[field] = value;
        setNewComponent(tmp);
    }, [newComponent])

    return (
        isVisible ?
            <Drawer
                title={"Добавить компонент"}
                onClose={onClose}
            >
                <div className={styles.wrapper}>
                    <div className={styles.form}>
                        <TextInput
                            label='Наименование'
                            size='xl'
                            placeholder='Введите наименование компонента'
                            value={newComponent?.name}
                            onChange={(e) => setComponentField("name", e.target.value)} />
                        <TextInput
                            label='Единицы измерения'
                            size='xl'
                            placeholder='Выберите единицы измерения компонента'
                            value={newComponent?.unit}
                            onChange={(e) => setComponentField("unit", e.target.value)} />
                        <Select
                            size='xl'
                            label='Категория'
                            placeholder="Категория"
                            value={[newComponent.category ? newComponent.category.name : ""]}
                            options={categoriesOpts.filter(c => c.content !== "Все")}
                            onUpdate={([category]) => {
                                const cat = categories.find(c => c.id?.toString() === category);
                                if (cat) setComponentField("category", cat)
                            }}
                        />
                        <TextInput
                            label='Код'
                            size='xl'
                            placeholder='Введите код компонента'
                            value={newComponent?.code}
                            onChange={(e) => setComponentField("code", e.target.value)} />
                        <TextInput
                            label='Наличие'
                            size='xl'
                            placeholder='Введите наличие компонента'
                            value={newComponent?.stock.toString()}
                            onChange={(e) => setComponentField("stock", e.target.value.replace(/\D/g, ''))} />

                    </div>
                    <div className={styles.actions}>
                        <Button view="action" size="xl" onClick={() => onAdd && onAdd(newComponent)}>Добавить</Button>
                        <Button view="outlined" size="xl">Отмена</Button>
                    </div>
                </div>
            </Drawer>
            : null
    )
}