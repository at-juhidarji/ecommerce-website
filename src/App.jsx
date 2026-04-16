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
import OrderSuccess from "./Page/Success";
import OrdersPage from "./Page/Order";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* Navbar */}
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
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/orders" element={<OrdersPage />} />


      </Routes>

      {/* Footer */}
      <Footer />

      {/* Toast */}
      <Toaster />
    </BrowserRouter>
  );
}