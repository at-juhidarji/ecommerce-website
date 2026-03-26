import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/Page/CartContext";

import {
  Menu,
  Search,
  ShoppingCart,
  ChevronDown,
  X,
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

const categories = [
  { name: "Men", path: "/menCollection" },
  { name: "Women", path: "/womenCollection" },
  { name: "Oversized", path: "/OversizeCollection" },
  { name: "Bags", path: "/BagCollection" },
  { name: "Sneakers", path: "/SneakersCollection" },
  { name: "Accessories", path: "/AccessoriesCollection" },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">

      {/* NAVBAR */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64">
              <div className="flex flex-col gap-4 mt-6">
                <SheetClose asChild>
                  <Link to="/">Home</Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link to="/collection">Collection</Link>
                </SheetClose>

                {categories.map((cat) => (
                  <SheetClose asChild key={cat.name}>
                    <Link to={cat.path}>{cat.name}</Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* LOGO */}
          <h1
            onClick={() => navigate("/")}
            className="text-lg sm:text-xl font-bold cursor-pointer whitespace-nowrap"
          >
            VASTRA<span className="text-orange-500">.CO</span>
          </h1>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 ml-4">
            <Link className="text-sm lg:text-base" to="/">Home</Link>
            <Link className="text-sm lg:text-base" to="/productCollection">
              Collection
            </Link>

            {/* DROPDOWN */}
            <div className="relative group">
              <div className="flex items-center gap-1 cursor-pointer text-sm lg:text-base">
                Categories
                <ChevronDown className="w-4 h-4" />
              </div>

              <div className="absolute top-10 left-0 w-52 bg-white shadow-xl border rounded-xl opacity-0 invisible group-hover:visible group-hover:opacity-100 transition z-50">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={cat.path}
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* DESKTOP SEARCH */}
          <div className="hidden md:flex items-center gap-2 relative">

            {showSearch && (
              <div className="relative">
                <Input
                  autoFocus
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-40 lg:w-64 transition-all"
                />

                {query && (
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
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-2 items-center"
                        >
                          <img
                            src={p.image}
                            className="w-8 h-8 object-cover rounded"
                          />
                          {p.name}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No products found
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(!showSearch)}
            >
              {showSearch ? <X /> : <Search />}
            </Button>
          </div>

          {/* CART */}
          <div className="relative">
            <Button
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

      {/* MOBILE SEARCH */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Input
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {query && (
            <div className="absolute w-full bg-white shadow-lg border mt-1 rounded-lg max-h-60 overflow-y-auto z-50">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      navigate(`/product/${p.id}`);
                      setQuery("");
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-2 items-center"
                  >
                    <img
                      src={p.image}
                      className="w-8 h-8 object-cover rounded"
                    />
                    {p.name}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};