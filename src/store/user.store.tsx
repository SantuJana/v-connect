import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  _id: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
  dob: string | null;
  city: string | null;
}

interface UserState {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const initUser = {
  _id: "",
  name: "",
  email: "",
  image: "",
  city: "",
  dob: null
};

const useUserStore = create(persist<UserState>((set) => ({
  user: initUser,
  setUser: (user: User) => set((state) => ({ user: user })),
  clearUser: () => set((state) => ({ user: initUser })),
}), {
    name: "user-storage",
    // storage: localStorage
}));

export default useUserStore;
