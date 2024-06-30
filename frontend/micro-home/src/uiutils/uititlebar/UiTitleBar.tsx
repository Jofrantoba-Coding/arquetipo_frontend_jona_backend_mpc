import React from 'react';
import Logo from '../../resources/images/logo-minjus.jpg'
import { TitleBarProps } from './InterUiTitleBar';

const UiTitleBar: React.FC<TitleBarProps> = () => {
  return (
    <>
      <header className="header p-[20px]">
        <div className="container items-center relative max-w-[1264px] m-auto">
          <div className="logo max-w-[180px] mb-[20px] m-auto">
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