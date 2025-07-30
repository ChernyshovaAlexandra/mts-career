import { create } from "zustand";
import { ACCOUNT_PAGE_DATA } from "../pages/AccountPage/constants";
import type { AccountPageData } from "../pages/AccountPage/types";

export interface UserData {
  name: string;
  region: string;
  // games: unknown[];
  points: number;
  // …остальные поля
}
interface UserState {
  isAuth: boolean;
  data: AccountPageData;
  user: UserData | null;
  setUser: (user: UserData) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  isAuth: true,
  data: ACCOUNT_PAGE_DATA,
  user: null,
  setUser: (user) => set({ user, isAuth: true }),
  logout: () => set({ isAuth: false, data: ACCOUNT_PAGE_DATA }),
}));
