/* Librerias externas */
import Cookies from 'js-cookie';

/* Interfaces */
import { UiTitleBarUser } from '../uiutils/uititlebar/InterUiTitleBar';
import { UiIniciarSesionResponse } from '../views/uiiniciarsesion/InterUiIniciarSesion';

const getExpirationTime = (expiresIn: number) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  return expirationDate;
}

const getUser = () => {
  const user = Cookies.get('auth_user');
  if (user) return JSON.parse(user);
  return { id: '' };
}

const setUser = (user: UiTitleBarUser) => {
  Cookies.set('auth_user', JSON.stringify(user));
}

const getToken = () => {
  const token = Cookies.get('access_token');
  return token ?? null;
}

const setToken = (token: string, expiresIn: number) => {
  const expirationDate = getExpirationTime(expiresIn);
  Cookies.set('access_token', token, { expires: expirationDate });
}

const getRefreshToken = () => {
  const token = Cookies.get('refresh_token');
  return token ?? null;
}

const setRefreshToken = (token: string, expiresIn: number) => {
  const expirationDate = getExpirationTime(expiresIn);
  Cookies.set('refresh_token', token, { expires: expirationDate });
}

const getSession = () => {
  const sessionString = Cookies.get('session');
  if (sessionString) {
    try {
      const session = JSON.parse(sessionString);
      return session;
    } catch (error) {
      console.error('Error parsing session:', error);
      return null;
    }
  }
  return null;
}

const setSession = (session: UiIniciarSesionResponse) => {
  const { token_type, session_state, clientName, realmName, expires_in, refresh_expires_in } = session;
  const expirationDate = getExpirationTime(expires_in);
  const sessionString = JSON.stringify({
    token_type, 
    session_state, 
    clientName, 
    realmName, 
    expires_in, 
    refresh_expires_in
  });
  Cookies.set('session', sessionString, { expires: expirationDate });
}

const setTokenExpiration = (expires_in: number) => {
  const expirationDate = getExpirationTime(expires_in);
  Cookies.set('token_expiration_time', expirationDate.toString(), { expires: expirationDate });
}

const getTokenExpiration = () => {
  const expirationTime = Cookies.get('token_expiration_time');
  return expirationTime ? parseInt(expirationTime) : null;
}

const clearSession = () => {
  Cookies.remove('auth_user');
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  Cookies.remove('token_expiration_time');
  Cookies.remove('session');
}

export {
  getUser,
  setUser,
  getToken,
  setToken,
  getRefreshToken,
  setRefreshToken,
  getSession,
  setSession,
  clearSession,
  setTokenExpiration,
  getTokenExpiration
}