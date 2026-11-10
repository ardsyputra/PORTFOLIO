import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "./context/ThemeContext";
import App from "./App";
import { Toaster } from "sonner";

import "./assets/fonts/fonts.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Toaster richColors position="bottom-right" />
    </ThemeProvider>
  </StrictMode>
);
