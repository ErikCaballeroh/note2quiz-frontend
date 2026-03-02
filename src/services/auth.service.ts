import { note2quizApi } from '../api/axios';
import { AuthResponse, LoginDto, RegisterDto, UserResponse } from '../types/auth.types';

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

export const getMe = async () => {
    try {
        const response = await note2quizApi.get<UserResponse>('/auth/me');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};