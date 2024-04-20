import { AuthEndpoint, ProfileEndpoint } from "./model";


const BASE_URL: string = 'http://localhost:8080/api/v1';

export const authEndpoint: AuthEndpoint = {
    LOGIN: BASE_URL + '/users/login',
    SIGNUP: BASE_URL + '/users/signup',
    SENDOTP: BASE_URL + '/users/otp',
}

export const profileEndpoint: ProfileEndpoint = {
    UPDATE: BASE_URL + '/users/user-update'
}