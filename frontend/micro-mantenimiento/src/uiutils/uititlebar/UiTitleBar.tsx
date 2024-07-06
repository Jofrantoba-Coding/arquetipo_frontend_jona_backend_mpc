/* React */
import React from 'react';

/* Imagenes */
import Logo from '../../resources/images/logo-minjus.jpg'

/* Cookie Storage */
import { getToken } from '../../methods/storage';

/* Servicios API */
import { logout } from '../../services/api-auth/auth';

/* Interfaces */
import { TitleBarProps } from './InterUiTitleBar';

/* Libreria Shared */
import { UiButton } from 'shared';


const UiTitleBar: React.FC<TitleBarProps> = ({ data }) => {
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
      <header className="header p-4 shadow-md bg-white">
        <div className="container items-center relative m-auto">
          <div className="flex justify-between">
            <div className="logo max-w-[180px]">
              <img src={Logo} alt="" />
            </div>
            <div className="menu flex items-center gap-[15px]">
              { data && (
                <div className="text-right">
                  <p className="text-black text-sm font-bold leading-none mb-[5px]">{data.username}</p>
                  <p className="text-black text-sm leading-none">{data.firstname} {data.lastname}</p>
                </div>
              )}
              <UiButton
                type={'button'}
                text={''}
                icon={'Power'}
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