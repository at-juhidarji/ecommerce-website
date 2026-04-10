import { useEffect } from "react";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import CartDrawer from "./components/layout/CartDrawer";

import { ProductCollection } from "./components/HomePage/Collection";
import ProductDetail from "./components/product/ProductDetail";

import ContactPage from "./Page/ContactPage";
import ScrollToTop from "./components/ui/ScrollToTop";
import { Toaster } from "./components/ui/Sonner";

import { HomePage } from "./Page/HomePage";
import { CollectionsPage } from "./Page/CollectionPage";
import { WishlistPage } from "./Page/WishList";
import CheckoutPage from "./Page/CheckOutPAge";

export default function App() {
  // n8n Chatbot Init
  useEffect(() => {
    createChat({
      webhookUrl: "https://piyushkarekar.app.n8n.cloud/webhook/640755bb-0ef6-4553-8392-6ce4fcefab91/chat",
    });
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* Navbar always visible */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/New" element={<ProductCollection />} />
        <Route path="/CartDrawer" element={<CartDrawer />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/productCollection" element={<ProductCollection />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>

      {/* Footer always visible */}
      <Footer />

      {/* Toast notifications */}
      <Toaster />
    </BrowserRouter>
  );
}