import React, { useEffect, useState } from "react";
import {
  Search,
  ShoppingCart,
  ChevronDown,
  Menu,
  Shirt,
  ShoppingBag,
  Footprints,
  Watch,
  Flame,
  Baby,
  MoreHorizontal,
  Sparkles,
  MapPin,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "./input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { useNavigate, Link, useLocation } from "react-router-dom";

// ✅ Categories with Icons
const categories = [
  { name: "Men", path: "/menCollection", icon: Shirt },
  { name: "Women", path: "/womenCollection", icon: Sparkles },
  { name: "Oversized", path: "/OversizeCollection", icon: Shirt },
  { name: "Bags", path: "/BagCollection", icon: ShoppingBag },
  { name: "Sneakers", path: "/SneakersCollection", icon: Footprints },
  { name: "Accessories", path: "/AccessoriesCollection", icon: Watch },
  { name: "Sale", path: "/SaleCollection", icon: Flame },
  { name: "Baby", path: "/BabyCollection", icon: Baby },
  { name: "More", path: "/MoreCollection", icon: MoreHorizontal },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 📍 LOCATION STATE
  const [locationName, setLocationName] = useState("Detecting...");

  // 📍 GET USER LOCATION
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationName("Not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );

          const data = await res.json();
          setLocationName(data.city || data.locality || "Unknown");
        } catch {
          setLocationName("Error");
        }
      },
      () => {
        setLocationName("Denied");
      }
    );
  }, []);

  return (
    <header className="w-full relative">
      <nav className="w-full bg-[#09090b] sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between gap-4">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-3">

            {/* Mobile Hamburger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white">
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="bg-black text-white w-72">
                <h2 className="text-xl font-bold mb-6">Menu</h2>

                <div className="flex flex-col gap-2">
                  {categories.map((cat, i) => {
                    const Icon = cat.icon;
                    const isActive = location.pathname === cat.path;

                    return (
                      <SheetClose asChild key={i}>
                        <Link
                          to={cat.path}
                          className={`flex items-center gap-3 px-3 py-3 rounded-lg transition ${
                            isActive
                              ? "bg-white text-black"
                              : "hover:bg-zinc-800"
                          }`}
                        >
                          <Icon className="size-5" />
                          {cat.name}
                        </Link>
                      </SheetClose>
                    );
                  })}

                  {/* 👤 Account in Mobile */}
                  <SheetClose asChild>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-800 mt-4 border-t border-white/10"
                    >
                      <User className="size-5" />
                      Account
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <button
              onClick={() => navigate("/")}
              className="text-2xl md:text-3xl font-[1000] tracking-tighter text-white"
            >
              VASTRA<span className="text-orange-400">.CO</span>
            </button>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6 text-white">

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2">
                Categories
                <ChevronDown className="size-4 group-hover:rotate-180 transition" />
              </button>

              <div className="absolute top-10 left-0 w-64 bg-black border border-zinc-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {categories.map((cat, i) => {
                  const Icon = cat.icon;
                  const isActive = location.pathname === cat.path;

                  return (
                    <Link
                      key={i}
                      to={cat.path}
                      className={`flex items-center gap-3 px-4 py-3 text-sm ${
                        isActive
                          ? "bg-white text-black"
                          : "text-gray-300 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      <Icon className="size-4" />
                      {cat.name}
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>

          {/* SEARCH */}
          <div className="hidden md:block max-w-sm w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
              <Input
                className="pl-10 bg-gray-100 text-black rounded-full"
                placeholder="Search..."
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* 📍 LOCATION */}
            <div className="hidden md:flex items-center gap-1 text-sm text-gray-300">
              <MapPin className="size-4" />
              {locationName}
            </div>

            {/* 👤 ACCOUNT */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
              className="text-white"
            >
              <User className="size-5" />
            </Button>

            {/* 🛒 CART */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/CartDrawer")}
              className="text-white"
            >
              <ShoppingCart className="size-5" />
            </Button>

          </div>

        </div>
      </nav>
    </header>
  );
};