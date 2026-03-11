import { Button } from "@/components/ui/button"
import { Navbar } from "./components/ui/Navbar"
import { Home } from "./Page/Home"
import { ProductCollection } from "./Page/ProductCollection"
import SubNavbar from "./components/ui/Subnavbar"
export default function App() {
  return (<>
     <Navbar />
    <SubNavbar />
     <Home />
    <ProductCollection />
    </>
  )
};