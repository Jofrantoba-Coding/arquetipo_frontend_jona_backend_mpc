import React from 'react';
import Logo from '../../resources/images/logo-minjus.jpg'
import { getToken } from '../../methods/storage';
import UiButton from '../uibutton/UiButton';
import { logout } from '../../services/auth';
const UiTitleBar: React.FC = () => {
  
  const auth = getToken()

  const handleLogout = async () => {
   const response =  await logout();
   if(response) {
    window.location.href = '/login'
   }
  }
  return (
    <>
    { auth ? (
      <header className="header p-[20px] shadow-md bg-white">
        <div className="container items-center relative m-auto">
          <div className="flex justify-between">
            <div className="logo max-w-[180px]">
              <img src={Logo} alt="" />
            </div>
            <div className="menu">
              <UiButton
                type={'button'}
                text={'Salir'}
                callback={ handleLogout } 
              />
            </div>
          </div>
        </div>
      </header>
    ) : (
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
    )}
    </>
  );
};

export default UiTitleBar;