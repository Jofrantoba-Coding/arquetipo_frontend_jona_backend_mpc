import React from 'react';
import Logo from '../../resources/images/logo-minjus.jpg'
import { TitleBarProps } from './InterUiTitleBar';
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