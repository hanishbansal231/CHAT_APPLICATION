import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your_secret_key';

export const encrypt = (value: string | CryptoJS.lib.WordArray) => {
    if (typeof value === 'string' || value instanceof String) {
        return CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
    } else {
        const serializedValue = JSON.stringify(value);
        return CryptoJS.AES.encrypt(serializedValue, SECRET_KEY).toString();
    }
};


const isValidJsonString = (value: string) => {
    try {
        JSON.parse(value);
        return true;
    } catch (error) {
        return false;
    }
};

export const decrypt = (encryptedValue: string | CryptoJS.lib.CipherParams) => {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
    const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
    if (isValidJsonString(decryptedValue)) {
        try {
            return JSON.parse(decryptedValue);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    }

    return decryptedValue;
};