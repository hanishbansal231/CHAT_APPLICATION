export interface AuthEndpoint {
    LOGIN: string;
    SENDOTP:string;
    SIGNUP:string;
}

export interface SignUpInterface {
    name?: string,
    username: string,
    email: string,
    password?: string,
}

export interface ProfileEndpoint {
    UPDATE:string;
}
