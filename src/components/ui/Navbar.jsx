import React from "react";
import { Search, ShoppingCart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Input } from "./input";

// ✅ Categories
const categories = [
  { name: "Men", path: "/menCollection" },
  { name: "Women", path: "/womenCollection" },
  { name: "Oversized", path: "/OversizeCollection" },
  { name: "Bags", path: "/BagCollection" },
  { name: "Sneakers", path: "/SneakersCollection" },
  { name: "Accessories", path: "/AccessoriesCollection" },
  { name: "Sale", path: "/SaleCollection" },
  { name: "Baby", path: "/BabyCollection" },
  { name: "More", path: "/MoreCollection" },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ FIX

  return (
    <header className="w-full relative">
      <nav className="w-full bg-[#09090b] sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between gap-4">

          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="text-2xl md:text-3xl font-[1000] tracking-tighter text-white cursor-pointer"
          >
            VASTRA<span className="text-orange-400">.CO</span>
          </button>

          <div className="relative group hidden md:block">
            {/* Button */}
            <button className="relative flex items-center gap-2 px-3 py-2 text-white  rounded-lg transition">
              Categories
              {/* Icon rotate */}
              <ChevronDown className="size-4 transition-transform duration-300 group-hover:rotate-180" />
              {/* Underline */}
              <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-orange-400 translate-y-full scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-center" />
            </button>

            {/* Dropdown */}
            <div className="absolute top-20  left-0 w-64 bg-black border border-zinc-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              {categories.map((cat, i) => {
                const isActive = location.pathname === cat.path;

                return (
                  <Link
                    key={i}
                    to={cat.path}
                    className={`block px-4 py-3 text-sm ${
                      isActive
                        ? "bg-white text-black"
                        : "text-gray-300 hover:bg-zinc-800 hover:text-white"
                    }`}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </div>
          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-base font-normal text-white h-full">
            <button
              onClick={() => navigate("/SaleCollection")} // Use the string path defined in your Routes
              className="relative flex items-center gap-1 hover:text-slate-400 transition-colors cursor-pointer h-full px-2 group/btn"
            >
              On Sale
              {/* The Smooth Underline */}
              <span className="absolute bottom-4 left-2 right-2 h-[2px] bg-orange-400 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-center" />
            </button>
            <button
              onClick={() => navigate("/New")}
              className="relative flex items-center gap-1 hover:text-slate-400 transition-colors cursor-pointer h-full px-2 group/btn"
            >
              New Arrivals
              <span className="absolute bottom-4 left-2 right-2 h-[2px] bg-orange-400 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-center" />
            </button>
            {/* Customer Care with Mega Menu */}
            <div className="group h-full flex items-center justify-center">
              <button className="relative flex items-center gap-1 hover:text-slate-400 transition-colors cursor-pointer h-full px-2 group/btn">
                Customer Care
                <ChevronDown className="size-4 group-hover/btn:rotate-180 transition-transform duration-300" />
                {/* The Smooth Underline */}
                <span className="absolute bottom-4 left-2 right-2 h-[2px] bg-orange-400 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-center" />
              </button>

              {/* The White Container - Now Absolute to the Nav */}
              <div className="absolute top-full left-0 w-full bg-white  text-black shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 py-10">
                  <div className="grid grid-cols-3 gap-8">
                    {/* Column 1 */}
                    <div>
                      <h3 className="font-bold text-orange-500 mb-4 uppercase text-xs tracking-widest">
                        Support
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-600">
                        <li className="hover:text-orange-500 cursor-pointer transition">
                          Help Center
                        </li>
                        <li className="hover:text-orange-500 cursor-pointer transition">
                          Order Tracking
                        </li>
                        <li className="hover:text-orange-500 cursor-pointer transition">
                          Returns & Exchanges
                        </li>
                      </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                      <h3 className="font-bold text-orange-500 mb-4 uppercase text-xs tracking-widest">
                        Contact
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-600">
                        <li className="hover:text-orange-500 cursor-pointer transition">
                          Live Chat
                        </li>
                        <li className="hover:text-orange-500 cursor-pointer transition">
                          Email Us
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-orange-500 mb-4 uppercase text-xs tracking-widest">
                        Support
                      </h3>
                      <ul className="space-y-3 text-sm text-slate-600">
                        <li className="hover:text-orange-500 cursor-pointer transition">
                          Help Center
                        </li>
                        <li className="hover:text-orange-500 cursor-pointer transition">
                          Order Tracking
                        </li>
                        <li className="hover:text-orange-500 cursor-pointer transition">
                          Returns & Exchanges
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="hidden md:block max-w-sm w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
              <Input
                className="pl-10 bg-gray-100 text-black rounded-full"
                placeholder="Search..."
              />
            </div>
          </div>

          {/* Cart */}
           {/* Right Icons */}
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="icon"
               onClick={() => navigate("/CartDrawer")}
              className="text-white hover:bg-white/10 rounded-full"
            >
              <ShoppingCart className="size-5" />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};
