import React from "react"
import { Button } from "@/components/ui/button"

import {
  Shirt,
  ShoppingBag,
  Footprints,
  Watch,
  Flame,
  Sparkles,
  PersonStanding,
  Mars,
  Venus
} from "lucide-react"

const categories = [
  { name: "Men", icon: Mars },
  { name: "Women", icon: Venus },
  { name: "Oversized", icon: Shirt },
  { name: "Bags", icon: ShoppingBag },
  { name: "Sneakers", icon: Footprints },
  { name: "Accessories", icon: Watch },
  { name: "Sale", icon: Flame },
  { name: "Babys", icon: PersonStanding },
  { name: "More", icon: Sparkles },
]

const SubNavbar = () => {
  return (
    <div className="w-full border-b bg-black text-white">
      <div className="flex gap-6 overflow-x-auto px-6 py-3">
        {categories.map((category, index) => {
          const Icon = category.icon

          return (
            <Button
              key={index}
              variant="ghost"
              className="flex items-center gap-3 text-sm hover:bg-zinc-800 hover:text-white"
            >
              <div className="p-2 rounded-lg">
                <Icon className="w-6 h-6" />
              </div>

              {category.name}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default SubNavbar