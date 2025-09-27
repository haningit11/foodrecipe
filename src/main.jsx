import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalProvider from "./context";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom"; // ✅ Add this

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Wrap everything inside this */}
      <AuthProvider>
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);