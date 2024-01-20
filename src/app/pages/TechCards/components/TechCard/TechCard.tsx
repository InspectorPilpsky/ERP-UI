import { TechCard } from "@domain/TechCard";
import TechCardInfo from "./Info/TechCardInfo";

interface Props {
    mode: "INFO" | "EDIT";
    techCard: TechCard;
}

export default function TechCardView({mode, techCard}: Props) {

    return (
        mode === "INFO" ? <TechCardInfo components={techCard.components} /> : <div>TECH CARD EDIT</div>
    )
}