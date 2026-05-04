import { note2quizApi } from '../api/api';
import { authApi } from '../api/authApi';
import { LoginRequestDto, LoginResponseDto } from '../types/dto/auth/login.dto';
import { RegisterRequestDto, RegisterResponseDto } from '../types/dto/auth/register.dto';
import {
    ForgotPasswordRequestDto,
    ForgotPasswordResponseDto,
    ResetPasswordRequestDto,
    ResetPasswordResponseDto,
    VerifyResetCodeRequestDto,
    VerifyResetCodeResponseDto,
} from '../types/dto/auth/reset-password.dto';
import { UserDataDto } from '../types/dto/auth/user.dto';

export const login = async (data: LoginRequestDto): Promise<LoginResponseDto> => {
    const response = await authApi.post(
        '/auth/login',
        data
    );
    return response.data;
};

export const register = async (data: RegisterRequestDto): Promise<RegisterResponseDto> => {
    const response = await authApi.post(
        '/auth/register',
        data
    );

    return response.data;
};

export const getMe = async (): Promise<UserDataDto> => {
    return await note2quizApi.get('/auth/me');
};

export const forgotPassword = async (data: ForgotPasswordRequestDto): Promise<ForgotPasswordResponseDto> => {
    const response = await authApi.post('/auth/forgot-password', data);

    return response.data;
};

export const verifyResetCode = async (
    data: VerifyResetCodeRequestDto
): Promise<VerifyResetCodeResponseDto> => {
    const response = await authApi.post('/auth/verify-reset-code', data);

    return response.data;
};

export const resetPassword = async (data: ResetPasswordRequestDto): Promise<ResetPasswordResponseDto> => {
    const response = await authApi.post('/auth/reset-password', data);

    return response.data;
};