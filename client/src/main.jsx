import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import App from "./App.jsx";
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </BrowserRouter>
  </StrictMode>
);
