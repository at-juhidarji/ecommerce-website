import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { ProductCollection } from "./components/HomePage/Collection";
import CartDrawer from "./components/layout/CartDrawer";
import ProductDetail from "./components/product/ProductDetail";
import { Footer } from "./components/layout/Footer";
import ContactPage from "./Page/ContactPage";
import ScrollToTop from "./components/ui/ScrollToTop";
import { Toaster } from "./components/ui/Sonner";
import { HomePage } from "./Page/HomePage";
import { CollectionsPage } from "./Page/CollectionPage";
import { WishlistPage } from "./Page/WishList";
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/New" element={<ProductCollection />} />
        <Route path="/CartDrawer" element={<CartDrawer />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/productCollection" element={<ProductCollection />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
}
