export interface LoginResponseDto {
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

export interface LoginRequestDto {
    email: string;
    password: string;
}