import React, { useState, useMemo, useEffect } from "react";
import { products } from "@/Data/Product";
import { ProductCard } from "@/components/product/ProductCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import {
  ShoppingBag,
  Footprints,
  Baby,
  Glasses,
  User,
  UserRound,
  Sparkles,
  SlidersHorizontal,
  X,
} from "lucide-react";

/* ✅ CATEGORY ICONS */
const CATEGORY_ICON = {
  bags: <ShoppingBag size={15} />,
  sneakers: <Footprints size={15} />,
  baby: <Baby size={15} />,
  accessories: <Glasses size={15} />,
  men: <User size={15} />,
  women: <UserRound size={15} />,
};

/* ✅ CATEGORY BUTTON */
const CatBtn = ({ cat, active, onClick }) => (
  <Button
    variant="ghost"
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 cursor-pointer ${
      active
        ? "bg-zinc-900 text-white border-zinc-900 shadow-lg shadow-zinc-900/20"
        : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900"
    }`}
  >
    {CATEGORY_ICON[cat]}
    <span className="capitalize">{cat}</span>
  </Button>
);

export const ProductCollection = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("bags");
  const [sort, setSort] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const ITEMS_PER_PAGE = 4;

  /* ✅ DATA SPLIT */
  const menProducts = products.filter((p) => p.category === "men");
  const womenProducts = products.filter((p) => p.category === "women");
  const otherProducts = products.filter(
    (p) => p.category !== "men" && p.category !== "women"
  );

  /* ✅ FILTER LOGIC */
  const categoryProducts = useMemo(() => {
    let filtered = otherProducts.filter(
      (p) => p.category === selectedCategory
    );

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (minRating > 0) {
      filtered = filtered.filter((p) => p.rating >= minRating);
    }

    filtered = filtered.filter((p) => p.price <= maxPrice);

    if (sort === "low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "high") filtered.sort((a, b) => b.price - a.price);

    return filtered;
  }, [selectedCategory, sort, minRating, maxPrice, search, otherProducts]);

  /* ✅ PAGINATION LOGIC */
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = categoryProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(categoryProducts.length / ITEMS_PER_PAGE);

  /* ✅ RESET PAGE WHEN FILTER CHANGES */
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sort, minRating, maxPrice, search]);

  const hasActiveFilters = search || sort || minRating > 0 || maxPrice < 5000;

  return (
    <section id="collection" className="bg-white py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* 🔥 TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-semibold mb-3">
            Curated for You
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
            Our Collection
          </h1>
          <p className="text-zinc-400 mt-3 text-sm max-w-md mx-auto">
            Premium fashion curated for modern lifestyle
          </p>
        </motion.div>

        {/* 👔 MEN */}
        <div className="mb-14">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Men</h2>
              <p className="text-zinc-400 text-sm mt-0.5">Essentials for him</p>
            </div>
            <button
              onClick={() => navigate("/collections?category=men")}
              className="text-sm text-zinc-400 cursor-pointer hover:text-zinc-900 transition-colors font-medium group flex items-center gap-1"
            >
              View All
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {menProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* 👗 WOMEN */}
        <div className="mb-14">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Women</h2>
              <p className="text-zinc-400 text-sm mt-0.5">Curated essentials for her</p>
            </div>
            <button
              onClick={() => navigate("/collections?category=women")}
              className="text-sm text-zinc-400 cursor-pointer hover:text-zinc-900 transition-colors font-medium group flex items-center gap-1"
            >
              View All
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {womenProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* 🔥 CATEGORY */}
        <div className="mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">
              Explore Categories
            </h2>
            <p className="text-zinc-400 text-sm mt-0.5">Browse by category</p>
          </div>

          {/* CATEGORY BUTTONS */}
          <div className="flex flex-wrap gap-2.5 mb-6">
            {["bags", "sneakers", "baby", "accessories"].map((cat) => (
              <CatBtn
                key={cat}
                cat={cat}
                active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              />
            ))}
          </div>

          {/* 🔍 FILTER TOGGLE + BAR */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 rounded-xl text-sm font-medium cursor-pointer"
              >
                <SlidersHorizontal size={14} />
                {showFilters ? "Hide Filters" : "Filters"}
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-orange-500 rounded-full" />
                )}
              </Button>

              <p className="text-sm text-zinc-400 font-medium">
                {categoryProducts.length} product{categoryProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-50/80 border border-zinc-100 rounded-2xl p-5 md:p-6 overflow-hidden"
              >
                <div className="flex flex-wrap justify-between items-end gap-5">

                  <div className="flex flex-wrap gap-5 items-end">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Search</label>
                      <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-zinc-200 px-3.5 py-2.5 rounded-xl text-sm w-44 md:w-56 bg-white focus:outline-none focus:border-zinc-400 transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Sort by</label>
                      <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="border border-zinc-200 px-3.5 py-2.5 rounded-xl text-sm bg-white focus:outline-none focus:border-zinc-400 transition-colors cursor-pointer"
                      >
                        <option value="">Default</option>
                        <option value="low">Price: Low → High</option>
                        <option value="high">Price: High → Low</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Rating</label>
                      <select
                        value={minRating}
                        onChange={(e) => setMinRating(Number(e.target.value))}
                        className="border border-zinc-200 px-3.5 py-2.5 rounded-xl text-sm bg-white focus:outline-none focus:border-zinc-400 transition-colors cursor-pointer"
                      >
                        <option value={0}>All</option>
                        <option value={3}>3★ & above</option>
                        <option value={4}>4★ & above</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                        Max Price: ₹{maxPrice.toLocaleString()}
                      </label>
                      <input
                        type="range"
                        min="500"
                        max="5000"
                        step="100"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="cursor-pointer accent-zinc-900 w-36"
                      />
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSearch("");
                        setSort("");
                        setMinRating(0);
                        setMaxPrice(5000);
                      }}
                      className="text-sm text-zinc-500 hover:text-zinc-900 cursor-pointer flex items-center gap-1.5"
                    >
                      <X size={14} />
                      Clear All
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* 🛍 PRODUCTS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {paginatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* 🔢 PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-2 flex-wrap">
              {Array.from(
                { length: totalPages },
                (_, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl text-sm font-medium cursor-pointer transition-all duration-300 ${
                      currentPage === i + 1
                        ? "bg-zinc-900 text-white shadow-md hover:bg-zinc-800 hover:text-white"
                        : "bg-zinc-50 text-zinc-500 hover:bg-zinc-100"
                    }`}
                  >
                    {i + 1}
                  </Button>
                )
              )}
            </div>
          )}

          {/* ❌ EMPTY */}
          {categoryProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-zinc-300" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight mb-1">No products found</h3>
              <p className="text-zinc-400 text-sm">Try adjusting your filters</p>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};