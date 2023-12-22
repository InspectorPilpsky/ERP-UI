import { AsideHeader, MenuItem } from "@gravity-ui/navigation";
import { getMenuItems } from "./menuItems";
import { ReactNode, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    content: ReactNode
}

export default function Menu({ content = undefined }: Props) {

    const navigate = useNavigate();

    const [compact, setCompact] = useState(false);

    const menuItemClickHandler = useCallback((item: MenuItem) => {
        navigate(item.id ? `/${item.id}` : "#");
    }, [navigate])
    return (
        <AsideHeader
            logo={{
                text: 'NNTeam ERP- UI',
                href: '#',
                onClick: () => alert('click on logo'),
            }}
            compact={compact}
            menuItems={getMenuItems(menuItemClickHandler)}
            onChangeCompact={(v) => {
                setCompact(v);
            }}
            renderContent={() => content}
            customBackgroundClassName="aside-header__custom-background"
            customBackground={<img src="https://discovery.sndimg.com/content/dam/images/discovery/fullset/2022/4/20/GettyImages-678915345.jpg.rend.hgtvcom.1280.1280.suffix/1650480060448.jpeg" />}
        />
    )
}
