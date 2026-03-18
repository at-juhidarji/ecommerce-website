import React, { useState } from "react";
import { Menu, X } from "lucide-react";
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

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Hamburger */}
      <button
        className="md:hidden text-white p-2"
        onClick={() => setOpen(true)}
      >
        <Menu size={28} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black z-50 p-5 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close */}
        <button
          className="text-white mb-6"
          onClick={() => setOpen(false)}
        >
          <X />
        </button>

        {/* Categories */}
        <div className="flex flex-col gap-3">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isActive = location.pathname === category.path;

            return (
              <Link
                key={index}
                to={category.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg
                ${
                  isActive
                    ? "bg-white text-black"
                    : "text-gray-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                <Icon size={18} />
                {category.name}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;