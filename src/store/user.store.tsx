import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: string | null;
  email: string | null;
  image: string | null;
}

interface UserState {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const initUser = {
  name: "",
  email: "",
  image: "",
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
