import "./main.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { LocaleProvider } from "./locale.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <LocaleProvider>
                <App />
            </LocaleProvider>
        </BrowserRouter>
    </StrictMode>
);
