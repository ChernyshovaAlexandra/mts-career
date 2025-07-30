import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { GlobalStyles, useSnackbar } from "../shared";
import { Snackbar } from "@chernyshovaalexandra/mtsui";

export const App = () => {
  const { open, options, hideSnackbar } = useSnackbar();
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
      {open && (
        <Snackbar
          type={options.type}
          message={options.message}
          autoHideDuration={options.autoHideDuration}
          onClose={hideSnackbar}
        />
      )}
    </>
  );
};
