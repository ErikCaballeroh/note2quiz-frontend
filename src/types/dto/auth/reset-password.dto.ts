export interface ForgotPasswordRequestDto {
    email: string;
}

export interface ForgotPasswordResponseDto {
    ok: boolean;
    message: string;
    expiresAt: string;
}

export interface VerifyResetCodeRequestDto {
    email: string;
    code: string;
}

export interface VerifyResetCodeResponseDto {
    ok: boolean;
    message: string;
    data: {
        email: string;
        resetToken: string;
        expiresAt: string;
    };
}

export interface ResetPasswordRequestDto {
    email: string;
    resetToken: string;
    newPassword: string;
}

export interface ResetPasswordResponseDto {
    ok: boolean;
    message: string;
    data: {
        id: number;
        email: string;
        name: string;
    };
}