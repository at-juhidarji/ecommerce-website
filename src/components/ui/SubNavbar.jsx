import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  { name: "Bags", icon: ShoppingBag, path: "/BagCollection" },
  { name: "Sneakers", icon: Footprints, path: "/SneakersCollection" },
  { name: "Accessories", icon: Watch, path: "/AccessoriesCollection" },
  { name: "Sale", icon: Flame, path: "/SaleCollection" },
  { name: "Babys", icon: PersonStanding, path: "/BabyCollection" },
  { name: "More", icon: Sparkles, path: "/MoreCollection" },
];

const SubNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // 🔥 for active state

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrolled(window.scrollY > 60);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <div
      className={`w-full sticky top-0 z-40 transition-all duration-300 
      ${scrolled ? "bg-black/90 backdrop-blur-md shadow-md" : "bg-[#18181b]/80 backdrop-blur-md"}
      border-b border-zinc-700/50`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center md:justify-center gap-3 overflow-x-auto px-4 py-3 scrollbar-hide">

          {categories.map((category, index) => {
            const Icon = category.icon;
            const isActive = location.pathname === category.path;

            return (
              <Link
                to={category.path}
                key={index}
                className={`flex items-center gap-2 text-sm whitespace-nowrap px-3 py-2 rounded-xl transition-all duration-300
                  
                  ${isActive 
                    ? "bg-white text-black scale-105" 
                    : "text-gray-300 hover:text-white hover:bg-zinc-800 hover:scale-105"}
                `}
              >
                <div className="p-1">
                  <Icon className="w-5 h-5" />
                </div>

                {category.name}
              </Link>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default SubNavbar;