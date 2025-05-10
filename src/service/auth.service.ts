import API_ENDPOINTS from "../constants/apiEndpoints";
import api from "./api";

export const login = (data: any) => {
    return api.post(API_ENDPOINTS.login, data);
}

export const register = (data: any) => {
    return api.post(API_ENDPOINTS.register, data);
}