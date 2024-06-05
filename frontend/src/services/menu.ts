import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from '../methods/storage';

export const getMenu = async () => {
    
    const token = getToken()
    const data = JSON.stringify({
        idClienteSistema: 7,
        idSistema: 1
    });

    const config: AxiosRequestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/usuario/show/menu`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        if (response.status === 200) {
            const responseData = response.data;
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