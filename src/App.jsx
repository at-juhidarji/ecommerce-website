import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/ui/Navbar";
import SubNavbar from "./components/ui/Subnavbar";
import HeroSection from "./Page/HeroSection";
import { MenCollection } from "./Page/Collections/MenCollection";
import { WomenCollection } from "./Page/Collections/WomenCollection";
import { ProductCollection } from "./Page/ProductCollection";
import { BagCollection } from "./Page/Collections/BagCollection";
import { SneakersCollection } from "./Page/Collections/SneakersCollection";
import { AccessoriesCollection } from "./Page/Collections/AccessoriesCollection";
import { SalesCollection } from "./Page/Collections/SalesCollection";
import { BabyCollection } from "./Page/Collections/BabyCollection";
import { MoreCollection } from "./Page/Collections/MoreCollection";
import CartDrawer from "./Page/Collections/CartDrawer";
import ProductDetail from "./Page/ProductDetail";
import { OverSizeCollection } from "./Page/Collections/OverSizeCollection";
import Sidebar from "./components/ui/Sidebar";
import MobileSidebar from "./components/ui/MoblieSidebar";

export default function App() {
  return (
    
    <BrowserRouter>
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

        <Route path="/SaleCollection" element={<SalesCollection />} />

        <Route path="/BabyCollection" element={<BabyCollection />} />

        <Route path="/MoreCollection" element={<MoreCollection />} />

        <Route path="/New" element={<ProductCollection />} />

        <Route path="/CartDrawer" element={<CartDrawer />} />

        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
