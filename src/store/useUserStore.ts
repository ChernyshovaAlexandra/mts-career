import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface SobesData {
  id: number;
  type: string;
  date: string;
  time: string;
  link: string;
  status: string;
  staff: {
    name: string;
    directions: string[];
  };
}

export interface KofeData {
  id: number;
  type: string;
  date: string;
  time: string;
  link: string;
  status: string;
  staff: {
    name: string;
    directions: string[];
  };
}

export interface UserData {
  name: string;
  region: string;
  status: string;
  points: number;
  position: number | null;
  kofe: KofeData | null;
  sobes: SobesData | null;
  personalCode: string;
  games?: Array<{
    name: string;
    status: string;
    points: number;
  }>;
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
