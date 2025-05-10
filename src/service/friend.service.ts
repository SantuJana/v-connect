import API_ENDPOINTS from "../constants/apiEndpoints";
import api from "./api";

export const getFriendRequestList = () => {
  return api.get(API_ENDPOINTS.friendRequestList);
};

export const acceptRequest = (id: string) => {
  return api.patch(API_ENDPOINTS.acceptRequest + `?friendId=${id}`);
};

export const rejectRequest = (id: string) => {
  return api.delete(API_ENDPOINTS.rejectRequest + `?friendId=${id}`);
};

export const getFriendsList = () => {
  return api.get(API_ENDPOINTS.friends);
};

export const removeFriend = (id: string) => {
  return api.delete(API_ENDPOINTS.removeFriend + `?friendId=${id}`);
};

export const getSuggestions = (searchText?: string) => {
  return api.get(API_ENDPOINTS.suggestions + `?searchText=${searchText || ''}`);
};

export const sendFriendRequest = (id: string) => {
  return api.post(API_ENDPOINTS.sendRequest, { friendId: id });
};
