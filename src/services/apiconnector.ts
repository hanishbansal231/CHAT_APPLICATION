import axios from "axios";

const axiosInstance = axios.create();

export const apiConnecter = (method: string, url: string, bodyData?: any, headers?: any, params?: undefined) => {
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null,
    })
}