import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

import {
  Menu,
  Search,
  ShoppingCart,
  ChevronDown,
  X,
  Heart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { products } from "@/Data/Product";

// ✅ Categories
const categories = [
  { name: "Men", key: "men" },
  { name: "Women", key: "women" },
  { name: "Oversized", key: "oversized" },
  { name: "Bags", key: "bags" },
  { name: "Sneakers", key: "sneakers" },
  { name: "Accessories", key: "accessories" },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const searchRef = useRef(null);

  // ✅ Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative w-full border-b bg-white sticky top-0 z-50">

      {/* NAVBAR */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger asChild>
              <Button  variant="ghost" size="icon" className="md:hidden cursor-pointer">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64 px-4 py-6 bg-white">
              <div className="flex flex-col gap-5">
                <h2 className="text-2xl font-semibold border-b pb-3">
                  Explore <span className="text-orange-500">Vastra</span>
                </h2>

                <SheetClose asChild>
                  <Link to="/" className="px-3 py-2 hover:bg-gray-100 rounded-lg">
                    Home
                  </Link>
                </SheetClose>

                <div className="border-t"></div>

                <p className="text-xs text-gray-400 uppercase">Categories</p>

                {categories.map((cat) => (
                  <SheetClose asChild key={cat.name}>
                    <Link
                      to={`/collections?category=${cat.key}`}
                      className="flex justify-between px-3 py-2 rounded-lg hover:bg-gray-100"
                    >
                      {cat.name}
                      <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* LOGO */}
          <h1
            onClick={() => navigate("/")}
            className="text-lg font-bold cursor-pointer"
          >
            VASTRA<span className="text-orange-500">.CO</span>
          </h1>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6 ml-4">
            <Link to="/">Home</Link>
           

            <div className="relative group">
              <div className="flex items-center gap-1 cursor-pointer">
                Categories
                <ChevronDown className="w-4 h-4" />
              </div>

              <div className="absolute top-full left-0 mt-1 w-52 bg-white shadow-xl border rounded-xl opacity-0 invisible group-hover:visible group-hover:opacity-100 transition z-50">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={`/collections?category=${cat.key}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2" ref={searchRef}>

          {/* SEARCH */}
          <div className="flex items-center gap-2">

            {/* DESKTOP */}
            <div className="hidden md:flex items-center gap-2 relative">
              {showSearch && (
                <div className="relative">
                  <Input
                    autoFocus
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />

                  {debouncedQuery && (
                    <div className="absolute w-full bg-white shadow-lg border mt-1 rounded-lg max-h-60 overflow-y-auto z-50">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => {
                              navigate(`/product/${p.id}`);
                              setQuery("");
                              setShowSearch(false);
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-2"
                          >
                            <img src={p.image} className="w-8 h-8 rounded" />
                            {p.name}
                          </div>
                        ))
                      ) : (
                        <p className="p-3 text-sm text-gray-400">
                          No results found
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              <Button 
              className="cursor-pointer"
              onClick={() => setShowSearch(!showSearch)} variant="ghost">
                {showSearch ? <X /> : <Search />}
              </Button>
            </div>

            {/* MOBILE ICON */}
            <Button
              className="md:hidden cursor-pointer"
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(!showSearch)}
            >
              {showSearch ? <X /> : <Search />}
            </Button>
          </div>

          {/* WISHLIST */}
          <div className="relative">
            <Button
            className="cursor-pointer"
              variant="ghost"
              size="icon"
              onClick={() => navigate("/wishlist")}
            >
              <Heart
                className={`w-5 h-5 ${
                  wishlist.length > 0
                    ? "text-red-500 fill-red-500"
                    : "text-black"
                }`}
              />
            </Button>

            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </div>

          {/* CART */}
          <div className="relative">
            <Button
            className="cursor-pointer"
              variant="ghost"
              size="icon"
              onClick={() => navigate("/CartDrawer")}
            >
              <ShoppingCart />
            </Button>

            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.reduce((t, i) => t + i.qty, 0)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 📱 MOBILE SEARCH (NO GAP FIX) */}
      {showSearch && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-md z-40">
          <div className="px-4 py-3">
            <Input
              autoFocus
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            {debouncedQuery && (
              <div className="bg-white border mt-2 rounded-lg max-h-60 overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        navigate(`/product/${p.id}`);
                        setQuery("");
                        setShowSearch(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-2"
                    >
                      <img src={p.image} className="w-8 h-8 rounded" />
                      {p.name}
                    </div>
                  ))
                ) : (
                  <p className="p-3 text-sm text-gray-400">
                    No results found
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};