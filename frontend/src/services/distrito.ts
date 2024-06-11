import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from '../methods/storage';
import { InterUiDistritoMantenimientoCrud, InterUiDistritoMantenimientoDelete } from '../views/uidistritomantenimiento/InterUiDistritoMantenimiento';

export const getDistritosAll = async () => {
    const token = getToken()
    const config: AxiosRequestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/distrito/listar/all`,
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

export const getDistritos = async (limit: number = 10, offset: number = 0) => {
    const token = getToken()
    const config: AxiosRequestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/distrito/listar/paginacion?limit=${limit}&offSet=${offset}`,
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

export const createDistrito = async (data: InterUiDistritoMantenimientoCrud) => {
    const token = getToken()
    const config: AxiosRequestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/distrito/save`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data
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


export const updateDistrito = async (data: InterUiDistritoMantenimientoCrud) => {
    const token = getToken()
    const config: AxiosRequestConfig = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/distrito/update`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data
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

export const deleteDistrito = async (data: InterUiDistritoMantenimientoDelete) => {
    const token = getToken()
    const config: AxiosRequestConfig = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/distrito/delete`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data
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