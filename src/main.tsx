import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { SnackbarContextProvider } from "./contexts/SnackbarContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SnackbarContextProvider>
    <AuthContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthContextProvider>
  </SnackbarContextProvider>
);
