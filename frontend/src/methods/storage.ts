import Cookies from 'js-cookie';

const getUser = () => {
  const user = Cookies.get('auth_user');
  if (user) return JSON.parse(user);
  return { id: '' };
}

const setUser = (user: any) => {
  Cookies.set('auth_user', JSON.stringify(user));
}

const getToken = () => {
  const token = Cookies.get('access_token');
  return token ?? null;
}

const setToken = (token: string) => {
  Cookies.set('access_token', token);
}

const getRefreshToken = () => {
  const token = Cookies.get('refresh_token');
  return token ?? null;
}

const setRefreshToken = (token: string) => {
  Cookies.set('refresh_token', token);
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

const setSession = (session: any) => {
  const { token_type, session_state, clientName, realmName, expires_in, refresh_expires_in } = session;
  const sessionString = JSON.stringify({
    token_type, 
    session_state, 
    clientName, 
    realmName, 
    expires_in, 
    refresh_expires_in
  });
  Cookies.set('session', sessionString);
}

const setTokenExpiration = (expires_in: number) => {
  const expirationTime = new Date().getTime() + expires_in * 1000;
  Cookies.set('token_expiration_time', expirationTime.toString());
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