import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import HeroSection from "./components/HomePage/HeroSection";
import { MenCollection } from "./Page/Collections/MenCollection";
import { WomenCollection } from "./Page/Collections/WomenCollection";
import { ProductCollection } from "./components/HomePage/Collection";
import { BagCollection } from "./Page/Collections/BagCollection";
import { SneakersCollection } from "./Page/Collections/SneakersCollection";
import { AccessoriesCollection } from "./Page/Collections/AccessoriesCollection";
import CartDrawer from "./Page/Collections/CartDrawer";
import ProductDetail from "./components/product/ProductDetail";
import { OverSizeCollection } from "./Page/Collections/OverSizeCollection";
import { Footer } from "./components/layout/Footer";
import ContactPage from "./Page/ContactPage";
import ScrollToTop from "./components/ui/ScrollToTop";
import { Toaster } from "./components/ui/Sonner";
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/menCollection" element={<MenCollection />} />
        <Route path="/womenCollection" element={<WomenCollection />} />
        <Route path="/OversizeCollection" element={<OverSizeCollection />} />
        <Route path="/BagCollection" element={<BagCollection />} />
        <Route path="/SneakersCollection" element={<SneakersCollection />} />
        <Route
          path="/AccessoriesCollection"
          element={<AccessoriesCollection />}
        />
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
