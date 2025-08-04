import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UserData {
  name: string;
  region: string;
  status: string;
  points: number;
  position: number | null;
  kofe: unknown;
  sobes: unknown;
  personalCode: string;
}

interface UserState {
  isAuth: boolean;
  user: UserData | null;
  setUser: (user: UserData) => void;
  logout: () => void;
}
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isAuth: false,
      user: null,
      setUser: (user) => set({ user, isAuth: true }),
      logout: () => set({ isAuth: false, user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isAuth: state.isAuth, user: state.user }),
    }
  )
);
