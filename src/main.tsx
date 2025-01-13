import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./routes/home/home";
import ViewPage from "./routes/view/view";

import "./index.css";

import "./styles/colors.css";
import "./styles/font.css";
import Layout from "./components/layout/layout";

const element = document.getElementById("root")!;

createRoot(element).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route Component={Layout}>
                    <Route Component={HomePage} path="/" index />
                    <Route Component={ViewPage} path="/:id" index />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
