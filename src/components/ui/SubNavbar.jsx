import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Shirt,
  ShoppingBag,
  Footprints,
  Watch,
  Flame,
  Sparkles,
  PersonStanding,
  Mars,
  Venus,
} from "lucide-react";

const categories = [
  { name: "Men", icon: Mars, path: "/menCollection" },
  { name: "Women", icon: Venus, path: "/womenCollection" },
  { name: "Oversized", icon: Shirt, path: "/OverSizeCollection" },
  { name: "Bags", icon: ShoppingBag, path: "/bags" },
  { name: "Sneakers", icon: Footprints, path: "/sneakers" },
  { name: "Accessories", icon: Watch, path: "/accessories" },
  { name: "Sale", icon: Flame, path: "/sale" },
  { name: "Babys", icon: PersonStanding, path: "/baby" },
  { name: "More", icon: Sparkles, path: "/more" }
]

const SubNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full bg-[#18181b]  border-zinc-700 sticky top-0 z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center md:justify-center gap-3 overflow-x-auto px-4 py-3 scrollbar-hide">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link to={category.path || "/"} key={index}>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-sm text-white whitespace-nowrap transition"
                >
                  <div className="p-2 rounded-md">
                    <Icon className="w-5 h-5" />
                  </div>

                  {category.name}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;
