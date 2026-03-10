import { Button } from "@/components/ui/button"
import { Navbar } from "./components/ui/Navbar"
import { Home } from "./Page/Home"
import { ProductCollection } from "./Page/ProductCollection"
export default function App() {
  return (<>
     <Navbar />
     <Home />
    <ProductCollection />
    </>
  )
};