import Cookies from 'js-cookie';

export const getUser = () => {
  const user = Cookies.get('auth_user');
  if (user) return JSON.parse(user);
  return { id: '' };
}

export const setUser = (user: any) => {
  Cookies.set('auth_user', JSON.stringify(user));
}

export const getToken = () => {
    const token = Cookies.get('access_token');
    return token ?? null;
  }
  
  export const setToken = (token: string) => {
    Cookies.set('access_token', token);
  }