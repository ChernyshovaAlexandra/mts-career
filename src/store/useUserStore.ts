import { create } from "zustand";
import { ACCOUNT_PAGE_DATA } from "../pages/AccountPage/constants";
import type { AccountPageData } from "../pages/AccountPage/types";

interface UserState {
  isAuth: boolean;
  data: AccountPageData;
  setAccountData: (data: AccountPageData) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  isAuth: true,
  data: ACCOUNT_PAGE_DATA,
  setAccountData: (data) => set({ data, isAuth: true }),
  logout: () => set({ isAuth: false, data: ACCOUNT_PAGE_DATA }),
}));
