import { TechCard } from "@domain/TechCard";
import { componentDTOToComponent } from "../../Components/transformers/fromDto";
import { TechCardDTO } from "../dto/TechCard.dto";

export function techCardDTOToTechCard(techCardDto: TechCardDTO): TechCard {
  const { id, name, code, stock, components} = techCardDto;
  return {
    id,
    name,
    code,
    stock,
    components: components.map( c => {
        const {id, qty, component} = c;
        return {
            id,
            quantity: qty,
            component: componentDTOToComponent(component)
        }
    })
  };
}
