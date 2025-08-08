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
  checkResumeAttemptsLeft?: number;
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
  decrementResumeAttempts: () => void;
  logout: () => void;
}
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isAuth: false,
      user: null,
      setUser: (user) => set({ user, isAuth: true }),
      decrementResumeAttempts: () =>
        set((state) => {
          if (!state.user) return state;
          const next = Math.max(0, (state.user.checkResumeAttemptsLeft ?? 0) - 1);
          return { user: { ...state.user, checkResumeAttemptsLeft: next } };
        }),
      logout: () => set({ isAuth: false, user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isAuth: state.isAuth, user: state.user }),
    }
  )
);
