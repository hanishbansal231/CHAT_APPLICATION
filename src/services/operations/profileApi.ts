
import { apiConnecter } from "../apiconnector";
import { profileEndpoint } from "../apis";

const {
    UPDATE
} = profileEndpoint;

export const updateProfile = async (data: any, token: string) => {
    try {
        const response = await apiConnecter("PUT", UPDATE, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        return response;
    } catch (error) {
        console.log("UPDATE PROFILE API ERROR............", error);
    }
};
