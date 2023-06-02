import axios from 'axios';
import { toast } from 'react-toastify';
import { MD5 } from 'crypto-js';

interface User {
    id: number;
    name: string;
    email: string;
    key: string;
    secret: string;
}

export const withSecretKey = (method: string, url: string, body?: any) => {
    const user: User = JSON.parse(localStorage.getItem('user') || '{}');
    const bodyStr = body ? JSON.stringify(body) : '';
    const signString = `${method}${url}${bodyStr}${user.secret}`;
    const sign = MD5(signString).toString();

    return {
        headers: {
            'Content-Type': 'application/json',
            Key: user.key,
            Sign: sign,
        },
    };
};

export const getErrorMessage = (e: any) => {
    const { response = {} } = e;
    const { data = {} } = response;
    const { message = 'Internal server error!' } = data;
    return message;
};

export const notify = (message: string, type: string) => {
    if (type === 'success') {
        return toast.success(message, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 4000,
        });
    } else if (type === 'error') {
        return toast.error(message, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 4000,
        });
    }
};

axios.defaults.baseURL = 'https://no23.lavina.tech';
