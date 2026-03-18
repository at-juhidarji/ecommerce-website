import React from "react";
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

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="hidden md:flex flex-col w-64 h-screen bg-black border-r border-zinc-800 p-4 fixed left-0 top-0">
      
      <h2 className="text-white text-xl font-bold mb-6 tracking-tight">
        Categories
      </h2>

      <div className="flex flex-col gap-2">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const isActive = location.pathname === category.path;

          return (
            <Link
              to={category.path}
              key={index}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              ${
                isActive
                  ? "bg-white text-black scale-[1.02]"
                  : "text-gray-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <Icon className="w-5 h-5" />
              {category.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;