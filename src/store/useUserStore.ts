import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { ACCOUNT_PAGE_DATA } from "../pages/AccountPage/constants";
import type { AccountPageData } from "../pages/AccountPage/types";

export interface UserData {
  name: string;
  region: string;
  status: string;
  points: number;
  position: number | null;
}

interface UserState {
  isAuth: boolean;
  data: AccountPageData;
  user: UserData | null;
  setUser: (user: UserData) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isAuth: false,
      data: ACCOUNT_PAGE_DATA,
      user: null,
      setUser: (user) => set({ user, isAuth: true }),
      logout: () => set({ isAuth: false, user: null, data: ACCOUNT_PAGE_DATA }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isAuth: state.isAuth, user: state.user }),
    }
  )
);
