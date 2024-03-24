import CryptoJS from 'crypto-js';
import { config } from 'dotenv';
import { asyncHandler } from '../helper/asyncHandler';
import ApiError from '../helper/apiError';
config();

const PIRVATE_KEY = process.env.PIRVATE_KEY;

const encrypt = asyncHandler(async (data) => {
    try {

        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), PIRVATE_KEY).toString();
        return encryptedData;

    } catch (error) {
        return next(new ApiError(402, "Internal Error", error));
    }
});

const decrypt = asyncHandler(async (encryptedData) => {
    try {

        const bytes = CryptoJS.AES.decrypt(encryptedData, PIRVATE_KEY);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;

    } catch (error) {
        return next(new ApiError(402, "Internal Error", error));
    }
});

export {
    encrypt,
    decrypt
}