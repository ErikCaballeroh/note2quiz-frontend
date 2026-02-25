import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const note2quizApi = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// interceptor para enviar el token automáticamente
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