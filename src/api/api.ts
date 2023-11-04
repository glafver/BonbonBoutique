import axios from 'axios';
import { OrderDataType } from '../types/types';

export const fetchProducts = async () => {
    const response = await axios.get('https://www.bortakvall.se/api/v2/products');
    return response.data.data;
};

export const fetchProduct = async (id: number) => {
    const response = await axios.get(`https://www.bortakvall.se/api/v2/products/${id}`);
    return response.data.data;
};

export const fetchTags = async () => {
    const response = await axios.get(`https://www.bortakvall.se/api/v2/tags`);
    return response.data.data;
};

export const postOrder = async (orderData: OrderDataType) => {
    const userId = import.meta.env.VITE_USER_ID;
    try {
        const response = await axios.post(`https://www.bortakvall.se/api/v2/users/${userId}/orders`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error posting order:', error);
        throw error;
    }
};
