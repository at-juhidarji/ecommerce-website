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
  LogIn,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { useNavigate, Link, useLocation } from "react-router-dom";
import { products } from "@/Data/Product";

// ✅ Categories
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

  const [query, setQuery] = useState("");
  const [locationName, setLocationName] = useState("Detecting...");

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔍 Filter products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  // 📍 Get Location
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
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
          );

          const data = await res.json();
          setLocationName(data.city || data.locality || "Unknown");
        } catch {
          setLocationName("Error");
        }
      },
      () => {
        setLocationName("Denied");
      },
    );
  }, []);

  return (
    <header className="w-full relative">
      <nav className="w-full bg-[#09090b] sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-white"
                >
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="bg-black text-white w-72">
                <h2 className="text-xl font-bold mb-6">Menu</h2>

                <div className="flex flex-col gap-2">
                  {/* Categories */}
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

                  {/* Account */}
                  <div className="border-t border-white/10 mt-4 pt-4">
                    <SheetClose asChild>
                      <Link
                        to={user ? "/" : "/login"}
                        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-800 transition"
                      >
                        {user ? (
                          <>
                            <User className="size-5" />
                            <span>My Account</span>
                          </>
                        ) : (
                          <>
                            <LogIn className="size-5" />
                            <span>Login</span>
                          </>
                        )}
                      </Link>
                    </SheetClose>
                  </div>
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

          {/* Desktop Categories */}
          <div className="hidden md:flex items-center gap-6 text-white">
            <div className="relative group">
              <button className="flex items-center gap-2">
                Categories
                <ChevronDown className="size-4 group-hover:rotate-180 transition" />
              </button>

              <div className="absolute top-10 left-0 w-64 bg-black border border-zinc-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                {categories.map((cat, i) => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={i}
                      to={cat.path}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-zinc-800 hover:text-white"
                    >
                      <Icon className="size-4" />
                      {cat.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="hidden md:block relative max-w-sm w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 bg-gray-100 text-black rounded-full"
                placeholder="Search products..."
              />
            </div>

            {query && (
              <div className="absolute z-50 w-full bg-white text-black rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                        setQuery("");
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200 flex items-center gap-2"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <span>{product.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2">No products found</div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {/* 📍 LOCATION */}
            <div className="hidden md:flex items-center gap-1 text-sm text-gray-300">
              <MapPin className="size-4" />
              {locationName}
            </div>

         <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="flex items-center gap-2 text-white">
      
      {/* Avatar */}
      <Avatar className="w-8 h-8">
        <AvatarImage src="https://i.pravatar.cc/100" />
        <AvatarFallback>
          {user?.email?.[0]?.toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>

    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent className="w-60 bg-black text-white border border-zinc-800">

    {user ? (
      <>
        {/* USER INFO */}
        <div className="flex items-center gap-3 px-3 py-3 border-b border-zinc-800">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://i.pravatar.cc/100" />
            <AvatarFallback>
              {user.email[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-xs text-gray-400">Signed in as</p>
            <p className="text-sm font-medium truncate">
              {user.email}
            </p>
          </div>
        </div>

        {/* MENU */}
        <DropdownMenuItem onClick={() => navigate("/account")}>
          My Account
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => navigate("/orders")}>
          Orders
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => navigate("/wishlist")}>
          Wishlist
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-red-400"
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          Logout
        </DropdownMenuItem>
      </>
    ) : (
      <>
        <DropdownMenuItem onClick={() => navigate("/login")}>
          Login
        </DropdownMenuItem>
      </>
    )}

  </DropdownMenuContent>
</DropdownMenu>

            {/* 🛒 CART WITH BADGE */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/CartDrawer")}
                className="text-white"
              >
                <ShoppingCart className="size-5" />
              </Button>

              {/* Badge */}
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                2
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
