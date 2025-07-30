// src/shared/useSnackbar.ts
import {
  useSnackbarStore,
  // type SnackbarOptions,
} from "../../store/useSnackbarStore";

export function useSnackbar() {
  const open = useSnackbarStore((s) => s.open);
  const options = useSnackbarStore((s) => s.options);
  const showSnackbar = useSnackbarStore((s) => s.showSnackbar);
  const hideSnackbar = useSnackbarStore((s) => s.hideSnackbar);

  return { open, options, showSnackbar, hideSnackbar };
}
