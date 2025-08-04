import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { GlobalStyles, useSnackbar } from "../shared";
import { Snackbar } from "@chernyshovaalexandra/mtsui";
import { useUserStore, type UserData } from "../store";
import { apiService, ApiService } from "../services/apiService";

export const App: React.FC = () => {
  const { open, options, hideSnackbar } = useSnackbar();
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    const token = ApiService.getAccessToken();
    if (token ) { //&& !useUserStore.getState().user
      apiService.getStatus().then((resp) => {
        const { user, position } = resp.data;
        const updUser: UserData = {
          ...user,
          personalCode: user.nickname,
          position: position,
        };

        setUser({ ...updUser });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
