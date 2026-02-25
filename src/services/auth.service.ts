import { note2quizApi } from '../api/axios';
import { AuthResponse, Data, LoginDto, RegisterDto } from '../types/auth.types';

export const login = async (
    data: LoginDto
): Promise<AuthResponse> => {
    try {
        const response = await note2quizApi.post<AuthResponse>(
            '/auth/login',
            data
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const register = async (
    data: RegisterDto
): Promise<AuthResponse> => {

    const response = await note2quizApi.post<AuthResponse>(
        '/auth/register',
        data
    );

    return response.data;

};

export const getMe = async (): Promise<Data> => {
    try {
        const response = await note2quizApi.get<AuthResponse>('/auth/me');
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};