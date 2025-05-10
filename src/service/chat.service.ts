import API_ENDPOINTS from "../constants/apiEndpoints"
import api from "./api"

export const getChatList = () => {
    return api.get(API_ENDPOINTS.chatList);
}