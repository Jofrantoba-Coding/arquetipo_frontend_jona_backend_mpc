/* Librerias Externas */
import axios, { AxiosRequestConfig } from 'axios';

/* Cookie Storage */
import { getToken } from '../../methods/storage';

export const getCurrentProfile = async () => {
    
    const token = getToken()
    
    const config: AxiosRequestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/usuario/find/current`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
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
