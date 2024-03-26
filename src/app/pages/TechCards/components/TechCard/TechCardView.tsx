import { TechCard } from "@domain/TechCard";
import TechCardInfo from "./Info/TechCardInfo";
import TechCardEdit from "./Edit/TechCardEdit";
import { Component } from "@domain/Component";
import styles from './styles.module.css'

type Mode = "INFO" | "EDIT"

interface Props {
    techCard: TechCard;
    componentsList: Component[];
    mode: Mode;
    onSave?: (techCard: TechCard) => void;
}

export default function TechCardView({ techCard, componentsList, mode = "INFO", onSave }: Props) {

    return (
        <div className={styles.techCardView}>
            {mode === "INFO" ? <TechCardInfo components={techCard.components} /> :
                <TechCardEdit techCard={techCard} componentsList={componentsList} onSave={onSave} />}
        </div>
    )
}