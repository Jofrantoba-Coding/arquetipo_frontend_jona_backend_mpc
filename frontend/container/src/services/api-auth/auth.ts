import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { clearSession, getRefreshToken, setRefreshToken, setSession, setToken, setTokenExpiration } from "../../methods/storage"

interface UserLogin {
    email: string;
    password: string;
}

export const getLogin = async (user: UserLogin) => {
    const data = qs.stringify({
        'client_id': process.env.REACT_APP_AUTH_CLIENT_ID,
        'client_secret': process.env.REACT_APP_AUTH_CLIENT_SECRET,
        'scope': process.env.REACT_APP_AUTH_SCOPE,
        'grant_type': 'password',
        'username': user.email,
        'password': user.password
    });

    let config: AxiosRequestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_AUTH_BASE_URL}/token`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        if (response.status === 200) {
            const responseData = response.data;
            const { access_token, refresh_token, expires_in, ...sessionData } = responseData;
            setSession({expires_in, ...sessionData});
            setToken(access_token, expires_in);  
            setRefreshToken(refresh_token, expires_in);
            setTokenExpiration(expires_in);
            scheduleTokenRefresh(expires_in);
            return responseData;
          } else {
            console.error(`Unexpected response status: ${response.status}`);
            return false;
          }
    } catch (error) {
        console.error(error);
        throw new Error('Login failed');
    }
};

export const requestAccessToken = () => {

}

export const requestRefreshAccessToken = async () => {
    const refreshToken = getRefreshToken()
    const data = qs.stringify({
        'client_id': process.env.REACT_APP_AUTH_CLIENT_ID,
        'client_secret': process.env.REACT_APP_AUTH_CLIENT_SECRET,
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken
    });

    let config: AxiosRequestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_AUTH_BASE_URL}/token`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        if (response.status === 200) {
            const responseData = response.data;
            const { access_token, refresh_token, expires_in, ...sessionData } = responseData;
            setSession({expires_in, ...sessionData});
            setToken(access_token, expires_in);
            setRefreshToken(refresh_token, expires_in);
            setTokenExpiration(expires_in);
            scheduleTokenRefresh(expires_in);
            return responseData;
          } else {
            console.error(`Unexpected response status: ${response.status}`);
            return false;
          }
    } catch (error) {
        console.error(error);
        throw new Error('Login failed');
    }
}

export const logout = async (): Promise<boolean> => {
    const refreshToken = getRefreshToken()
    const data = qs.stringify({
        'redirect_uri': 'https://ide.icl.gob.pe',
        'client_id': process.env.REACT_APP_AUTH_CLIENT_ID,
        'client_secret': process.env.REACT_APP_AUTH_CLIENT_SECRET,
        'refresh_token': refreshToken
    });

    const config: AxiosRequestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_AUTH_BASE_URL}/logout`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        if (response.status === 204) {
            clearSession();
            return true;
        } else {
            console.error(`Unexpected response status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const scheduleTokenRefresh = (expires_in: number) => {
    const refreshTime = (expires_in - 5) * 1000; // menos 5 segundos
    console.log(refreshTime);
    setTimeout(requestRefreshAccessToken, refreshTime);
};