import { TechCard } from "@domain/TechCard";
import TechCardInfo from "./Info/TechCardInfo";
import TechCardEdit from "./Edit/TechCardEdit";
import { useState } from "react";
import { Button } from "@gravity-ui/uikit";
import { Component } from "@domain/Component";

interface Props {
    techCard: TechCard;
    componentsList: Component[];
    onSave?: (techCard: TechCard) => void;
    onDelete?: (techCard: TechCard) => void;
}

export default function TechCardView({ techCard, componentsList, onSave, onDelete }: Props) {

    const [mode, setMode] = useState<"INFO" | "EDIT">("INFO");

    return (
        <div>
            {mode === "INFO" ?
                <Button onClick={() => setMode("EDIT")}>Редактировать</Button> :
                <Button onClick={() => setMode("INFO")}>Отмена</Button>}
            <Button onClick={() => onDelete && onDelete(techCard)}>Удалить</Button>
            {mode === "INFO" ? <TechCardInfo components={techCard.components} /> :
                <TechCardEdit techCard={techCard} componentsList={componentsList} onSave={onSave}/>}
        </div>
    )
}