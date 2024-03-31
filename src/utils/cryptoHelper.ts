import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your_secret_key';

export const encrypt = (value: string) => {
    return CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
};

export const decrypt = (encryptedValue: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};
