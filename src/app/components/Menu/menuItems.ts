import { MenuItem } from "@gravity-ui/navigation";
import {Receipt, Puzzle, GearPlay, Frame, Tag, Boxes3} from '@gravity-ui/icons';

export function getMenuItems(clickHandler: (item: MenuItem) => void): MenuItem[] {
 return(
    [
        {
            id: 'orders',
            title: 'ЗАКАЗЫ',
            icon: Receipt,
            onItemClick: clickHandler
        },
        {
            id: 'manufactoring',
            title: 'ПРОИЗВОДСТВО',
            icon: GearPlay,
            onItemClick: clickHandler
        },
        {
            id: 'warehouse',
            title: 'СКЛАД',
            icon: Boxes3,
            onItemClick: clickHandler
        },
        {
            id: 'techcards',
            title: 'ТЕХНОЛОГИЧЕСКИЕ КАРТЫ',
            icon: Frame,
            onItemClick: clickHandler
        },
        {
            id: 'components',
            title: 'КОМПОНЕНТЫ',
            icon: Puzzle,
            onItemClick: clickHandler
        },
        {
            id: 'categories',
            title: 'КАТЕГОРИИ',
            icon: Tag,
            onItemClick: clickHandler
        },
    ]
 )
}