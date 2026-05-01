import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import CartDrawer from "./components/layout/Cart";

import { ProductCollection } from "./components/HomePage/Collection";
import ProductDetail from "./components/product/ProductDetail";

import ContactPage from "./Page/ContactPage";
import ScrollToTop from "./components/ui/ScrollToTop";
import { Toaster } from "./components/ui/Sonner";

import { HomePage } from "./Page/HomePage";
import { CollectionsPage } from "./Page/CollectionPage";
import { WishlistPage } from "./Page/WishList";
import CheckoutPage from "./Page/CheckOutPAge";
import OrderSuccess from "./Page/Success";
import OrdersPage from "./Page/Order";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* Skip Link (Best Practice) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-black text-white px-3 py-2 z-50"
      >
        Skip to main content
      </a>

      {/* Navbar */}
      <Navbar />

      {/* ✅ MAIN LANDMARK ADDED HERE */}
      <main id="main-content" className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/New" element={<ProductCollection />} />
          <Route path="/CartDrawer" element={<CartDrawer />} />
          <Route
            path="/product/:id"
            element={<ProductDetail key={window.location.pathname} />}
          />
          <Route path="/productCollection" element={<ProductCollection />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast */}
      <Toaster />
    </BrowserRouter>
  );
}