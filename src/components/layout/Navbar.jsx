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

// ─────────────────────────────────────────────
// Categories
// ─────────────────────────────────────────────
const categories = [
  { name: "Men",         key: "men"         },
  { name: "Women",       key: "women"       },
  { name: "Oversized",   key: "oversized"   },
  { name: "Bags",        key: "bags"        },
  { name: "Sneakers",    key: "sneakers"    },
  { name: "Accessories", key: "accessories" },
];

// ─────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────
export const Navbar = () => {
  const navigate = useNavigate();
  const { cart }     = useCart();
  const { wishlist } = useWishlist();

  const [query,          setQuery]          = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showSearch,     setShowSearch]     = useState(false);
  const [scrolled,       setScrolled]       = useState(false);

  const searchRef       = useRef(null);
  const desktopInputRef = useRef(null);

  // ── scroll → glassmorphism ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── debounce ──
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // ── auto-focus desktop input ──
  useEffect(() => {
    if (showSearch && desktopInputRef.current) {
      desktopInputRef.current.focus();
    }
  }, [showSearch]);

  // ── close on outside click ──
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        closeSearch();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const closeSearch = () => {
    setShowSearch(false);
    setQuery("");
    setDebouncedQuery("");
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  const cartQty = cart.reduce((t, i) => t + i.qty, 0);

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-surface/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.04)] border-b border-border/50"
          : "bg-surface border-b border-border"
      }`}
    >
      {/* ── MAIN BAR ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* ── LEFT ── */}
        <div className="flex items-center gap-4">

          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-72 px-8 py-8 bg-surface">
              <div className="flex flex-col gap-6">
                <h2 className="text-xl font-semibold tracking-tight border-b border-border pb-4">
                  Explore <span className="text-primary">Vastra</span>
                </h2>

                <SheetClose asChild>
                  <Link
                    to="/"
                    className="px-3 py-2.5 hover:bg-muted rounded-xl text-sm font-medium transition-colors"
                  >
                    Home
                  </Link>
                </SheetClose>

                <div className="border-t border-border" />

                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-semibold">
                  Categories
                </p>

                {categories.map((cat) => (
                  <SheetClose asChild key={cat.key}>
                    <Link
                      to={`/collections?category=${cat.key}`}
                      className="flex justify-between items-center px-3 py-2.5 rounded-xl hover:bg-muted text-sm font-medium transition-colors"
                    >
                      {cat.name}
                      <ChevronDown className="w-4 h-4 -rotate-90 text-muted-foreground" />
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <h1
            onClick={() => navigate("/")}
            className="text-lg font-black tracking-tight cursor-pointer select-none"
          >
            VASTRA<span className="text-primary">.CO</span>
          </h1>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 ml-6">
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative
                after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[1.5px]
                after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
            >
              Home
            </Link>

            <Link
              to="/orders"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative
                after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[1.5px]
                after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
            >
              Orders
            </Link>

            {/* Categories dropdown */}
            <div className="relative group">
              <div className="flex items-center gap-1 cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Categories
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
              </div>

              <div
                className="absolute top-full left-0 mt-3 w-56 bg-surface/95 backdrop-blur-xl
                  shadow-xl border border-border rounded-2xl p-2
                  opacity-0 invisible translate-y-2
                  group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                  transition-all duration-300 z-50"
              >
                {categories.map((cat) => (
                  <Link
                    key={cat.key}
                    to={`/collections?category=${cat.key}`}
                    className="block px-4 py-2.5 hover:bg-muted rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>

        {/* ── RIGHT ──
            overflow-visible is the key fix — prevents the expanding
            input and dropdown from being clipped by this flex container
        ── */}
        <div ref={searchRef} className="flex items-center gap-1 overflow-visible">

          {/* ── DESKTOP SEARCH ── */}
          <div className="hidden md:flex items-center gap-2 relative overflow-visible">

            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 280, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-visible"
                >
                  <Input
                    ref={desktopInputRef}
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="h-9 rounded-xl bg-muted border-border placeholder:text-muted-foreground w-full"
                  />

                  {/* Results dropdown */}
                  <AnimatePresence>
                    {debouncedQuery && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-80 bg-surface border border-border
                          shadow-2xl rounded-2xl z-[200] overflow-hidden"
                      >
                        <div className="max-h-72 overflow-y-auto p-2 scrollbar-hide">
                          {filteredProducts.length > 0 ? (
                            filteredProducts.map((p) => (
                              <div
                                key={p.id}
                                onClick={() => {
                                  navigate(`/product/${p.id}`);
                                  closeSearch();
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    navigate(`/product/${p.id}`);
                                    closeSearch();
                                  }
                                }}
                                role="button"
                                tabIndex={0}
                                className="px-3 py-2.5 hover:bg-muted cursor-pointer flex items-center gap-3 rounded-xl transition-colors"
                              >
                                <img
                                  src={p.image}
                                  className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
                                  alt={p.name}
                                />
                                <span className="text-sm font-medium text-foreground line-clamp-1">
                                  {p.name}
                                </span>
                              </div>
                            ))
                          ) : (
                            <p className="p-4 text-sm text-muted-foreground text-center">
                              No results found
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle button */}
            <Button
              onClick={() => (showSearch ? closeSearch() : setShowSearch(true))}
              variant="ghost"
              size="icon"
              aria-label={showSearch ? "Close search" : "Open search"}
            >
              {showSearch ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </Button>
          </div>

          {/* ── MOBILE SEARCH TOGGLE ── */}
          <Button
            className="md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => (showSearch ? closeSearch() : setShowSearch(true))}
            aria-label={showSearch ? "Close search" : "Open search"}
          >
            {showSearch ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </Button>

          {/* ── WISHLIST ── */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/wishlist")}
              aria-label="Wishlist"
            >
              <Heart
                className={`w-[18px] h-[18px] transition-all duration-300 ${
                  wishlist.length > 0
                    ? "text-destructive fill-destructive scale-110"
                    : "text-foreground"
                }`}
              />
            </Button>

            <AnimatePresence>
              {wishlist.length > 0 && (
                <motion.span
                  key="wish-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 bg-destructive text-destructive-foreground
                    text-[10px] font-bold w-[18px] h-[18px] flex items-center justify-center
                    rounded-full shadow-sm pointer-events-none"
                >
                  {wishlist.length}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* ── CART ── */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/CartDrawer")}
              aria-label="Cart"
            >
              <ShoppingCart className="w-[18px] h-[18px] text-foreground" />
            </Button>

            <AnimatePresence>
              {cartQty > 0 && (
                <motion.span
                  key="cart-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground
                    text-[10px] font-bold w-[18px] h-[18px] flex items-center justify-center
                    rounded-full shadow-sm pointer-events-none"
                >
                  {cartQty}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* ── MOBILE SEARCH BAR ── */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-b border-border bg-surface shadow-lg z-40"
          >
            <div className="px-4 py-4 space-y-3">
              <Input
                autoFocus
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-10 rounded-xl bg-muted border-border placeholder:text-muted-foreground"
              />

              <AnimatePresence>
                {debouncedQuery && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-surface border border-border rounded-2xl max-h-60 overflow-y-auto p-2 scrollbar-hide"
                  >
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            navigate(`/product/${p.id}`);
                            closeSearch();
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              navigate(`/product/${p.id}`);
                              closeSearch();
                            }
                          }}
                          role="button"
                          tabIndex={0}
                          className="px-3 py-2.5 hover:bg-muted cursor-pointer flex items-center gap-3 rounded-xl transition-colors"
                        >
                          <img
                            src={p.image}
                            className="w-9 h-9 rounded-lg object-cover shrink-0"
                            alt={p.name}
                          />
                          <span className="text-sm font-medium text-foreground">
                            {p.name}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="p-4 text-sm text-muted-foreground text-center">
                        No results found
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
};