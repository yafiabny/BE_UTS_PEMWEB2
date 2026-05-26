export interface User {
    id: number;
    name: string;
    nim: string;
    password: string;
    bio: string;
    event: string;
    createdAt: Date;
}

export interface LoginRequest {
    nim: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    nim: string;
    password: string;
    bio: string;
    event: string;
}
