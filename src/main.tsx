import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";

// Убрать при деплое в prod
import("react-axe").then(axe => {
  import("react-dom").then(ReactDOM => {
    axe.default(React, ReactDOM, 1000);
  });
});


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
