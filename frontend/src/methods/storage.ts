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

const clearSession = () => {
  Cookies.remove('auth_user');
  Cookies.remove('access_token');
}

export {
  getUser,
  setUser,
  getToken,
  setToken,
  clearSession
}