import axios from 'axios';
import { OrderDataType, Product, ExtandedProduct, TagType } from '../types/types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const userId = import.meta.env.VITE_USER_ID;

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

interface ApiResponse<T> {
    data: T;
}

const get = async <T>(endpoint: string): Promise<T> => {
    const response = await instance.get<ApiResponse<T>>(endpoint);
    return response.data.data;
};

const post = async <Payload, Response = unknown>(endpoint: string, data: Payload) => {
    const response = await instance.post<Response>(endpoint, data);
    return response.data;
};

export const fetchProducts = async (): Promise<Product[]> => {
    return get("/products");
};

export const fetchProduct = async (id: number): Promise<ExtandedProduct> => {
    return get(`/products/${id}`);
};

export const fetchTags = async (): Promise<TagType[]> => {
    return get("/tags");
};

export const postOrder = async (orderData: OrderDataType) => {
    try {
        return post<OrderDataType, { status: string, data: { id: number; }; }>(`/users/${userId}/orders`, orderData);
    } catch (error) {
        console.error('Error posting order:', error);
        throw error;
    }
};
