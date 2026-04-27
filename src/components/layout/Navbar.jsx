import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";

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
  const [scrolled, setScrolled] = useState(false);

  const searchRef = useRef(null);

  // Scroll detection for navbar glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.04)] border-b border-zinc-100/50"
          : "bg-white border-b border-zinc-100"
      }`}
    >
      {/* NAVBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger asChild>
              <Button               
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-72 px-6 py-8 bg-white">
              <div className="flex flex-col gap-6">
                <h2 className="text-xl font-semibold tracking-tight border-b border-zinc-100 pb-4">
                  Explore <span className="text-primary">Vastra</span>
                </h2>

                <SheetClose asChild>
                  <Link
                    to="/"
                    className="px-3 py-2.5 hover:bg-zinc-50 rounded-xl text-sm font-medium transition-colors"
                  >
                    Home
                  </Link>
                </SheetClose>

                <div className="border-t border-zinc-100"></div>

                <p className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-semibold">
                  Categories
                </p>

                {categories.map((cat) => (
                  <SheetClose asChild key={cat.name}>
                    <Link
                      to={`/collections?category=${cat.key}`}
                      className="flex justify-between items-center px-3 py-2.5 rounded-xl hover:bg-zinc-50 text-sm font-medium transition-colors"
                    >
                      {cat.name}
                      <ChevronDown className="w-4 h-4 -rotate-90 text-zinc-300" />
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* LOGO */}
          <h1
            onClick={() => navigate("/")}
            className="text-lg font-black tracking-tight cursor-pointer select-none"
          >
            VASTRA<span className="text-primary">.CO</span>
          </h1>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 ml-6">
            <Link
              to="/"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors relative after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[1.5px] after:bg-zinc-950 after:transition-all after:duration-300 hover:after:w-full"
            >
              Home
            </Link>

            <Link
              to="/orders"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors relative after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[1.5px] after:bg-zinc-950 after:transition-all after:duration-300 hover:after:w-full"
            >
              Order
            </Link>

            <div className="relative group">
              <div className="flex items-center gap-1 cursor-pointer text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors">
                Categories
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
              </div>

              <div className="absolute top-full left-0 mt-3 w-56 bg-white/95 backdrop-blur-xl shadow-xl border border-zinc-100 rounded-2xl opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 z-50 p-2 translate-y-2 group-hover:translate-y-0">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={`/collections?category=${cat.key}`}
                    className="block px-4 py-2.5 hover:bg-zinc-50 rounded-xl text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-1" ref={searchRef}>
          {/* SEARCH */}
          <div className="flex items-center gap-1">
            {/* DESKTOP */}
            <div className="hidden md:flex items-center gap-2 relative">
              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 260, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden"
                  >
                    <Input
                      autoFocus
                      placeholder="Search products..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />

                    {debouncedQuery && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute w-full bg-white shadow-xl border border-zinc-100 mt-2 rounded-2xl max-h-72 overflow-y-auto z-50 p-2"
                      >
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((p) => (
                            <div
                              key={p.id}
                              onClick={() => {
                                navigate(`/product/${p.id}`);
                                setQuery("");
                                setShowSearch(false);
                              }}
                              className="px-3 py-2.5 hover:bg-zinc-50 cursor-pointer flex items-center gap-3 rounded-xl transition-colors"
                            >
                              <img  
                                src={p.image}
                                className="w-9 h-9 rounded-lg object-cover"
                                alt={p.name}
                              />
                              <span className="text-sm font-medium text-zinc-700 line-clamp-1">
                                {p.name}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="p-4 text-sm text-zinc-400 text-center">
                            No results found
                          </p>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                onClick={() => setShowSearch(!showSearch)}
                variant="ghost"
                size="icon"
                aria-label={showSearch ? "Close search" : "Open search"}
              >
                {showSearch ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* MOBILE ICON */}
            <Button
              className="md:hidden"
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(!showSearch)}
              aria-label={showSearch ? "Close search" : "Open search"}
            >
              {showSearch ? (
                <X className="w-4 h-4" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* WISHLIST */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/wishlist")}
              aria-label="View wishlist"
            >
              <Heart
                className={`w-4.5 h-4.5 transition-all duration-300 ${
                  wishlist.length > 0
                    ? "text-red-500 fill-red-500 scale-110"
                    : "text-zinc-700"
                }`}
              />
            </Button>

            {wishlist.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full shadow-sm"
              >
                {wishlist.length}
              </motion.span>
            )}
          </div>

          {/* CART */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/CartDrawer")}
              aria-label="View shopping cart"
            >
              <ShoppingCart className="w-4.5 h-4.5 text-zinc-700" />
            </Button>

            {cart.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full shadow-sm"
              >
                {cart.reduce((t, i) => t + i.qty, 0)}
              </motion.span>
            )}
          </div>
        </div>
      </div>

      {/* 📱 MOBILE SEARCH */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-zinc-100 shadow-lg z-40 overflow-hidden"
          >
            <div className="px-4 py-4">
              <Input
                autoFocus
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-10 rounded-xl bg-zinc-50 border-zinc-200 placeholder:text-zinc-400"
              />

              {debouncedQuery && (
                <div className="bg-white border border-zinc-100 mt-3 rounded-2xl max-h-60 overflow-y-auto p-2">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          navigate(`/product/${p.id}`);
                          setQuery("");
                          setShowSearch(false);
                        }}
                        className="px-3 py-2.5 hover:bg-zinc-50 cursor-pointer flex items-center gap-3 rounded-xl transition-colors"
                      >
                        <img
                          src={p.image}
                          className="w-9 h-9 rounded-lg object-cover"
                          alt={p.name}
                        />
                        <span className="text-sm font-medium text-zinc-700">
                          {p.name}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-sm text-zinc-400 text-center">
                      No results found
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
