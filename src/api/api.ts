import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ApiResponse, TypedAxiosInstance } from '../types/api.types';

export const note2quizApi = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
}) as TypedAxiosInstance;

note2quizApi.interceptors.request.use(
    async (config) => {

        const token = await AsyncStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

note2quizApi.interceptors.response.use((response) => {

    const data = response.data as ApiResponse<any>;

    if (!data.ok) {
        throw new Error(data.message || 'API Error');
    }

    return data.data;

});