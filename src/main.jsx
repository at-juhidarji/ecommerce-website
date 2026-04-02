import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext";
// Clerk imports and key constants have been removed

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <App />
  </CartProvider>,
);
