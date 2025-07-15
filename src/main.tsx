import "./main.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { LocaleProvider } from "./locale.tsx";


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <LocaleProvider>
            <App />
        </LocaleProvider>
    </StrictMode>
);
