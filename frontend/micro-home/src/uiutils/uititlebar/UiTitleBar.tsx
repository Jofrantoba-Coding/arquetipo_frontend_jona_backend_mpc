/* React */
import React from 'react';

/* Imagenes */
import Logo from '../../resources/images/logo-minjus.jpg'

/* Interfaces */
import { TitleBarProps } from './InterUiTitleBar';

/* Estilos */
import '../../resources/css/UiTitleBar.css'

const UiTitleBar: React.FC<TitleBarProps> = () => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
          <div className="menu">
            <p>Gestión Defensorial App</p>
          </div>
        </div>
      </header>
    </>
  );
};

export default UiTitleBar;