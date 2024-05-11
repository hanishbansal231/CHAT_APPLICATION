import { apiConnecter } from "../apiconnector";
import { authEndpoint } from "../apis";
import { SignUpInterface } from "../model";

const {
    SENDOTP,
    SIGNUP,
    LOGIN
} = authEndpoint;

export const sendOtp = async (data: SignUpInterface) => {
    try {
        console.log(data);
        const response = await apiConnecter("POST", SENDOTP, data);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        return response;
    } catch (error) {
        console.log("SENDOTP API ERROR............", error);
    }
};


export const signup = async (data: any) => {
    try {
        const response = await apiConnecter("POST", SIGNUP, data);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        return response;
    } catch (error) {
        console.log("SIGNUP API ERROR............", error);
    }
};


export async function login(data: any) {
    try {
        const response = await apiConnecter("POST", LOGIN, data);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
       return response;
    } catch (error) {
        console.log("LOGIN API ERROR............", error);
    }
}