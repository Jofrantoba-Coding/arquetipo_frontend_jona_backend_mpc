import React from 'react';
import { MenuProps, MenuItem } from './InterUiMenuBar';

const UiMenuBar: React.FC<MenuProps> = ({ data }) => {
    const renderMenu = (items: MenuItem[]) => {
        return (items.map((item) => (
            <li key={item.id} className="relative group">
                <a href={item.path} className="flex items-center p-4 hover:bg-[#dd3333] hover:text-white">
                    {item.descripcion}
                </a>
                {item.submenus && item.submenus.length > 0 && (
                    <ul className="absolute min-w-[180px] left-0 mt-0 hidden group-hover:block bg-white shadow-lg border">
                        {renderMenu(item.submenus)}
                    </ul>
                )}
            </li>
        ))
        );
    };

    return (
        <nav className="bg-[#ededed]">
            <ul className="flex space-x-4">
                {renderMenu(data)}
            </ul>
        </nav>
    );
};

export default UiMenuBar;