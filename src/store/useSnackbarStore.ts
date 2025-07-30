import { create } from "zustand";

export type SnackbarType = "success" | "error";

export interface SnackbarOptions {
  message: React.ReactNode;
  type?: SnackbarType;
  autoHideDuration?: number;
}

interface SnackbarState {
  open: boolean;
  options: SnackbarOptions;
  showSnackbar: (opts: SnackbarOptions) => void;
  hideSnackbar: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const hide = () => {
    set({ open: false });
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const show = (opts: SnackbarOptions) => {
    // если до этого ещё висел таймер — очищаем
    if (timeoutId) clearTimeout(timeoutId);

    set({
      open: true,
      options: {
        message: opts.message,
        type: opts.type ?? "success",
        autoHideDuration: opts.autoHideDuration ?? 3000,
      },
    });

    // планируем автоскрытие
    timeoutId = setTimeout(hide, opts.autoHideDuration ?? 3000);
  };

  return {
    open: false,
    options: {
      message: null,
      type: "success",
      autoHideDuration: 3000,
    },
    showSnackbar: show,
    hideSnackbar: hide,
  };
});
