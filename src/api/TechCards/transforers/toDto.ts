import { TechCard } from "@domain/TechCard";
import { TechCardDTO } from "../dto/TechCard.dto";
import { componentTocomponentDTO } from "@api/Components/transformers/toDto";

export function techCardToTechCardDTO(techCard: TechCard): TechCardDTO {
  const { id, name, code, stock, components} = techCard;
  return {
    id,
    name,
    code,
    stock,
    components: components.map( c => {
        const {id, quantity, component} = c;
        return {
            id,
            qty: quantity,
            component: componentTocomponentDTO(component)
        }
    })
  };
}
