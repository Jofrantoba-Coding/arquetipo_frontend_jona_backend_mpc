/* React */
import React from 'react';

/* Interfaces */
import { MenuProps, MenuItem } from './InterUiMenuBar';

const UiMenuBar: React.FC<MenuProps> = ({ data, callback }) => {
    const renderMenu = (items: MenuItem[]) => {
        return (items.map((item) => (
            <li key={item.id} className="relative group">
                <button 
                    onClick={() => callback(item.id)} 
                    className="flex items-center p-4 hover:bg-[#dd3333] w-full hover:text-white"
                >
                    {item.descripcion}
                </button>
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
        <nav className="relative bg-[#ededed] z-10 mb-[20px]">
            <ul className="flex space-x-4">
                {renderMenu(data)}
            </ul>
        </nav>
    );
};

export default UiMenuBar;