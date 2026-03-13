import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/ui/Navbar";
import SubNavbar from "./components/ui/Subnavbar";
import HeroSection from "./Page/HeroSection";
import { MenCollection } from "./Collections/MenCollection";
import { WomenCollection } from "./Collections/WomenCollection";
import { ProductCollection } from "./Page/ProductCollection";
import { OverSizeCollection } from "./Collections/OverSizeCollection";

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

      </Routes>

    </BrowserRouter>
  );
}