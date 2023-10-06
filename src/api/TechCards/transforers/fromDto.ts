import { componentDTOToComponent } from "../../Components/transformers/fromDto";
import { TechCard } from "../domain/TechCard";
import { TechCardDTO } from "../dto/TechCard.dto";

export function techCardDTOToTechCard(techCardDto: TechCardDTO): TechCard {
  const { id, name, code, components} = techCardDto;
  return {
    id,
    name,
    code,
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
