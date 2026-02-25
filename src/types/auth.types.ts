export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    ok: boolean;
    data: Data;
    token: string;
    message: string;
}

export interface Data {
    id: number;
    email: string;
    name: string;
    createdAt: Date;
}