import React from 'react';
import { MenuProps, MenuItem } from './InterUiMenuBar';
import '../../resources/css/UiMenuBar.css'

const UiMenuBar: React.FC<MenuProps> = ({ data, callback }) => {
    const renderMenu = (items: MenuItem[]) => {
        return (items.map((item) => (
            <li key={item.id} className="nav-item">
                <button 
                    onClick={() => callback(item.id)} 
                    className="nav-button"
                >
                    {item.descripcion}
                </button>
                {item.submenus && item.submenus.length > 0 && (
                    <ul className="nav-submenu">
                        {renderMenu(item.submenus)}
                    </ul>
                )}
            </li>
        ))
        );
    };

    return (
        <nav className="nav">
            <ul className="nav-list">
                {renderMenu(data)}
            </ul>
        </nav>
    );
};

export default UiMenuBar;