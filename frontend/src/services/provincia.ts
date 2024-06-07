import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "../methods/storage";

export const getProvinciaByIdDepartamento = async (idDepartamento: number) => {
    const token = getToken()
    const config: AxiosRequestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/provincia/find/listarbydepartamento`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: {
            idDepartamento
        }
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