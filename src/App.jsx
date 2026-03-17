import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/ui/Navbar";
import SubNavbar from "./components/ui/Subnavbar";
import HeroSection from "./Page/HeroSection";
import { MenCollection } from "./Collections/MenCollection";
import { WomenCollection } from "./Collections/WomenCollection";
import { ProductCollection } from "./Page/ProductCollection";
import { OverSizeCollection } from "./Collections/OverSizeCollection";
import { BagCollection } from "./Collections/BagCollection";
import { SneakersCollection } from "./Collections/SneakersCollection";
import { AccessoriesCollection } from "./Collections/AccessoriesCollection";
import { SalesCollection } from "./Collections/SalesCollection";
import { BabyCollection } from "./Collections/BabyCollection";
import { MoreCollection } from "./Collections/MoreCollection";
import CartDrawer from "./Page/CartDrawer";
import { products } from "./components/ui/Product";
import ProductDetail from "./Page/ProductDetail";

export default function App() {
  return (
    <BrowserRouter>

      <Navbar />
      <SubNavbar />

      <Routes>

        <Route path="/" element={<HeroSection />} />

        <Route path="/menCollection" element={<MenCollection />} />

        <Route path="/womenCollection" element={<WomenCollection />} />
        
        <Route path="/OversizeCollection" element={<OverSizeCollection />} />

        <Route path="/BagCollection" element={<BagCollection />} />

        <Route path="/SneakersCollection" element={<SneakersCollection />} />

         <Route path="/AccessoriesCollection" element={<AccessoriesCollection />} />

        <Route path="/SaleCollection" element={<SalesCollection/>} />
      
       <Route path="/BabyCollection" element={<BabyCollection/>} />

        <Route path="/MoreCollection" element={<MoreCollection/>} />

          <Route path="/New" element={<ProductCollection/>} />

          <Route path="/CartDrawer" element={<CartDrawer/>} />

           <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>

    </BrowserRouter>
  );
}