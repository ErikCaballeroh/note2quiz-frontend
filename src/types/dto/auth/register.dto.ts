export interface RegisterResponseDto {
    ok: boolean;
    data: UserDataDto;
    token: string;
    message: string;
}

export interface UserDataDto {
    id: number;
    email: string;
    name: string;
    createdAt: Date;
}

export interface RegisterRequestDto {
    name: string;
    email: string;
    password: string;
}